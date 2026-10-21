/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // The old site lived at /home. Keep any shared links working.
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/work/mkc/unboxing-videos", destination: "/work/mkc/unboxings", permanent: true },
    ];
  },
};

export default nextConfig;
