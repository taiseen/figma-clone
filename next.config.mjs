/** @type {import('next').NextConfig} */
const nextConfig = {

    webpack: (config) => {
        // for working with canvas need this config 
        config.externals.push({
            "utf-8-validate": "commonjs utf-8-validate",
            bufferutil: "commonjs bufferutil",
            canvas: "commonjs canvas",
        });
        // config.infrastructureLogging = { debug: /PackFileCache/ };
        return config;
    },

    // get imgs form external source by <Image /> api in NextJs...
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "liveblocks.io",
                port: "",
            },
        ],
    },
};

export default nextConfig;
