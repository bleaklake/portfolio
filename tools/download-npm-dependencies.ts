import { execSync } from "node:child_process";
import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { EOL } from "node:os";
import { join } from "node:path";

const content = Object.values(JSON.parse(readFileSync(join(import.meta.dirname!, "../deno.json"), "utf8")).imports).map(it=>{
return `/// <reference types="${it}" />`;
}).join(EOL);
const f = join(import.meta.dirname!, "./modules.ts");
writeFileSync(f, content);
execSync("deno cache --node-modules-dir " + f);
unlinkSync(f);



