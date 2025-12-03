/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',               // ← ده اللي بيولّد مجلد out
  images: { unoptimized: true },  // لتفادي مشاكل الصور في التصدير
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};
