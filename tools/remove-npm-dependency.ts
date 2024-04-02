import { join } from 'node:path';
import { writeFileSync, readFileSync } from "node:fs";

const main = () => {
    const name = Deno.args[0].toLowerCase();

    const denoFile = join(import.meta.dirname!, "../deno.json");
    const config = JSON.parse(readFileSync(denoFile, "utf8"));

    if(!config?.imports?.[name]){
        return;
    }

    delete config.imports[name];
    writeFileSync(denoFile, JSON.stringify(config, null, 2));
};

main();