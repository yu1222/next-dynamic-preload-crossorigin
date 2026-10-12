# next/dynamic preload vs `crossOrigin` (Turbopack)

Minimal reproduction: with `crossOrigin: 'anonymous'` and a cross-site `assetPrefix`, hydration of a page that uses `next/dynamic` is delayed by roughly one second per wave of chunks.

- `PreloadChunks` emits `ReactDOM.preload(href, { as: 'script', fetchPriority: 'low', nonce })` without `crossOrigin`.
- Since 16.3.0 (#92070), the Turbopack runtime creates chunk scripts with `script.crossOrigin = 'anonymous'`.
- Chrome can't reuse the `no-cors` preload for a `cors` script and logs `A preload for '…' is found, but is not used because the request credentials mode does not match`.

## Run

```bash
npm install
npm run build
npm run assets   # terminal 1: serves .next/static on http://127.0.0.1:4000 with CORS
npm run start    # terminal 2: http://localhost:3000
```

Open http://localhost:3000 in Chrome. The page shows when it hydrated, and the console shows the warnings.

`localhost` and `127.0.0.1` are different sites, like a page and its CDN. On CodeSandbox the tasks in `.codesandbox/tasks.json` do the same with the `-3000` / `-4000` preview URLs.

## Results

Chrome (Playwright Chromium), production build, median of 5 cold loads:

| Variant | Hydrated at | "credentials mode does not match" | chunk requests |
| --- | --- | --- | --- |
| **16.3.4** | **3,062ms** | 12 | 30 |
| **16.5.0-canary.8** | **3,061ms** | 12 | 30 |
| 16.2.12 | 51ms | 0 | 18 |
| 16.3.4 + `npm run apply-fix` | 37ms | 0 | 18 |
| 16.3.4, `crossOrigin` removed from config | 36ms | 0 | 18 |
| 16.3.4, same-origin assets (`ASSET_PREFIX= npm run build`) | 70ms | 12 | 30 |

- With the mismatch, each affected chunk takes about 1,000–1,040ms from script insertion to `load`, even though the second request is a cache hit. With matching modes it takes about 0–1ms.
- With same-origin assets, the warning and the duplicate requests are still there, but the delay is not.

## Proposed fix

```diff
 // packages/next/src/shared/lib/lazy-dynamic/preload-chunks.tsx
 ReactDOM.preload(href, {
   as: 'script',
   fetchPriority: 'low',
   nonce: workStore.nonce,
+  crossOrigin: process.env.__NEXT_CROSS_ORIGIN,
 })
```

`npm run apply-fix` applies this to `node_modules`. Run `npm run build` again afterwards.

To try other versions, use `npm install next@16.2.12` or `npm install next@canary`, then rebuild.
