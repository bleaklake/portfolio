import { PluginSimple, Token } from "markdown-it";
import XMLJS from "xml-js";

const URLRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/gi;

const joinPath = (...chunks: string[]): string => {
  const parts = chunks.reduce((parts, segment) => {
    if (parts.length > 0) {
      segment = segment.replace(/^\//, "");
    }
    segment = segment.replace(/\/$/, "");
    return parts.concat(segment.split("/"));
  }, []);
  const res: string[] = [];
  for (const part of parts) {
    if (part === ".") {
      continue;
    }
    if (part === "..") {
      res.pop();
      continue;
    }
    res.push(part);
  }
  return res.join("/");
};

export const markdownItBaseURL = (
  baseUrl: string,
  attribs: string[],
): PluginSimple => {
  return (md) => {
    md.core.ruler.push("baseURL", (state) => {
      const rewriteHTML = (dom: XMLJS.Element) => {
        if (dom.elements) {
          for (const it of dom.elements) {
            rewriteHTML(it);
          }
        }

        if (dom.attributes) {
          for (const key in dom.attributes) {
            if (
              dom.attributes.hasOwnProperty(key) &&
              attribs.includes(key) &&
              !dom.attributes[key].toString().match(URLRegex)
            ) {
              dom.attributes[key] = joinPath(
                baseUrl,
                dom.attributes[key].toString(),
              );
            }
          }
        }
      };

      const rewrite = (tokens: Token[]) => {
        for (const token of tokens) {
          if (["html_block"].includes(token.type)) {
            try {
              const dom = XMLJS.xml2js(token.content, {
                compact: false,
              }) as XMLJS.Element;

              rewriteHTML(dom);

              token.content = XMLJS.js2xml(dom);
            } catch (err) {
              console.log(err);
            }
          }

          for (const attr of (token.attrs ?? [])) {
            if (
              attribs.includes(attr[0]) &&
              !attr[1].toString().match(URLRegex)
            ) {
              attr[1] = joinPath(baseUrl, attr[1]);
            }
          }

          if (token.children) {
            rewrite(token.children);
          }
        }
      };
      rewrite(state.tokens);
    });
  };
};
