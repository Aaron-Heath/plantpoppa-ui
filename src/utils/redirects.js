import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function createRedirects() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    console.log(__dirname);

    const DATA = 
`# proxy to api
/api/* https://${process.env.PP_AUTH_URL}/:splat 200!`;
    fs.writeFile('dist/_redirects', DATA, (err) => {
        if (err) throw err;
    });

}

createRedirects();




