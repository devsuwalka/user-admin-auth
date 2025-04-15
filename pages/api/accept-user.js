// accept-user.js
import connectDB from '@/lib/db';
import User from '../../models/user';

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.body;
  const user = await User.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  await transporter.sendMail({
    to: user.email,
    subject: 'Welcome!',
    text: `Hi ${user.name}, your account has been successfully authenticated.`,
  });

  res.status(200).json({ message: 'User accepted and email sent' });
}
