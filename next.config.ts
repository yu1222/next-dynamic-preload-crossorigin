import type {NextConfig} from 'next';

// The page and its assets must be on different *sites*. With a same-origin assetPrefix
// the mismatch warning still shows up, but the ~1s delay does not.
//   local:        page http://localhost:3000, assets http://127.0.0.1:4000
//   CodeSandbox:  page https://<id>-3000.csb.app, assets https://<id>-4000.csb.app
const sandboxId = process.env.CSB_SANDBOX_ID;
const defaultAssetPrefix = sandboxId ? `https://${sandboxId}-4000.csb.app` : 'http://127.0.0.1:4000';

const nextConfig: NextConfig = {
    assetPrefix: process.env.ASSET_PREFIX ?? defaultAssetPrefix,
    crossOrigin: 'anonymous',
};

export default nextConfig;
