import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function createRedirects() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    console.log(__dirname);

    const DATA = 
    `# proxy to api
    /api/*    ${process.env.PP_AUTH_URL} 200`;
    fs.writeFile('opt/build/repo/dist/_redirects', DATA, (err) => {
        if (err) throw err;
    });

}

createRedirects();




