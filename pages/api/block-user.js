// pages/api/block-user.js
import connectDB from '../../lib/db';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await connectDB();
    const { id } = req.body;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted (blocked)' });
  } catch (error) {
    console.error('Block/Delete Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
