// Applies the proposed fix to node_modules: pass crossOrigin to ReactDOM.preload in PreloadChunks.
// Run `npm run build` again afterwards.
import fs from 'node:fs';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const file = require.resolve('next/dist/shared/lib/lazy-dynamic/preload-chunks.js');
const src = fs.readFileSync(file, 'utf8');
if (src.includes('__NEXT_CROSS_ORIGIN')) {
    console.log('already applied:', file);
} else {
    const next = src.replace(/(fetchPriority: 'low',\s*nonce: workStore\.nonce)(\s*\})/, '$1,\n                    crossOrigin: process.env.__NEXT_CROSS_ORIGIN$2');
    if (next === src) throw new Error(`pattern not found in ${file}`);
    fs.writeFileSync(file, next);
    console.log('applied:', file);
}
