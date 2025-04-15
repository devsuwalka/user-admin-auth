import connectDB from '@/lib/db';
import User from '../../models/user';


export default async function handler(req, res) {
  await connectDB();
  const users = await User.find();
  res.status(200).json(users);
}
