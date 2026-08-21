import type { NextConfig } from 'next';

const wpUrl = new URL(process.env.NEXT_PUBLIC_WORDPRESS_URL!);

const nextConfig: NextConfig = {
    /* config options here */
    allowedDevOrigins: ['192.168.1.11'],
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: wpUrl.protocol.replace(':', '') as 'http' | 'https',
                hostname: wpUrl.hostname,
                port: wpUrl.port,
                pathname: '/**',
            },
        ],
        dangerouslyAllowLocalIP: true,
    },
    output: 'standalone',
};

export default nextConfig;
