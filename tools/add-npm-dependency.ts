import { join } from 'node:path';
import { writeFileSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";


const main = async () => {
    const name = Deno.args[0].toLowerCase();
    const res = await fetch(`https://registry.npmjs.org/${name}`, {

    });
    const payload = await res.json();

    const SEMVER_REGEX = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/gi;

    const time = payload.time as Record<string, string>;

    let currentDateMs = 0;
    let currentVersion = "";

    for(const [k, v] of Object.entries(time)){
        if(!SEMVER_REGEX.test(k)){
            continue;
        }
        const t = new Date(v).getTime();
        if(t < currentDateMs){
            continue;
        }
        currentDateMs = t;
        currentVersion = k;
    }

    const denoFile = join(import.meta.dirname!, "../deno.json");
    const config = JSON.parse(readFileSync(denoFile, "utf8"));

    if(!config.imports){
        config.imports = {};
    }

    config.imports[name] = `npm:${name}@^${currentVersion}`;
    writeFileSync(denoFile, JSON.stringify(config, null, 2));

    execSync("deno task download");
};

main();