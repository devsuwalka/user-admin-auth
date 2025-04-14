import connectDB from '@/lib/db';
import User from '/models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp === otp) {
      user.isVerified = true;
      user.otp = undefined; // optional: remove OTP after verification
      await user.save();
      return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
