// pages/api/signin.js
import connectDB from '@/lib/db';
import User from '/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      if (!user.isVerified) {
        return res.status(400).json({ message: 'Please verify your email first' });
      }

      res.status(200).json({ message: 'Sign-in successful' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
