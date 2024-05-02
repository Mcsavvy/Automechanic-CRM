import mongoose, { Mongoose } from 'mongoose';

let db: Mongoose | null = null;

export default async function connect(): Promise<Mongoose> {
  const dbUri: string | undefined = process.env.MONGODB_URI;
  console.log('Connecting to database:', dbUri);
  if (db) {
    return db;
  }
  try {
    db = await mongoose.connect(dbUri as string);
    console.log('Connection successful');
    return db;
  } catch (err) {
    console.error('Database connection error', err);
    throw err;
  }
}
