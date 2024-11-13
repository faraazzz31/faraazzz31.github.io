/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Remove basePath and assetPrefix since this is a user/organization site
}

export default nextConfig;