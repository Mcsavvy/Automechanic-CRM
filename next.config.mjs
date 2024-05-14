/** @type {import('next').NextConfig} */
import mongoose from 'mongoose';

const dbUri = process.env.MONGODB_URI;
if (!globalThis.db) {
    console.log('Connecting to database:', dbUri);
    globalThis.db = await mongoose.connect(dbUri);

}


const nextConfig = {};

export default nextConfig;
