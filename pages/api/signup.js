import connectDB from '@/lib/db';
import User from './models/User';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();
    const { name, mobile, email, roll, branch } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000); // ✅ generate OTP

    try {
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: 'Email already registered.' });
      }

      // ✅ Save user along with OTP
      await User.create({
        name,
        mobile,
        email,
        roll,
        branch,
        isVerified: false,
        otp: otp.toString(), // store as string (optional)
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is ${otp}`,
      });

      res.status(200).json({ message: 'OTP sent', email }); // ✅ returning email is helpful for frontend
    } catch (error) {
      console.error('Signup Error:', error);
      res.status(500).json({ message: 'Signup failed', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}


// // pages/api/signup.js
// import connectDB from '@/lib/db';
// import User from '/models/User';
// import nodemailer from 'nodemailer';

// export default async function handler(req, res) {
//   // Only handle POST requests
//   if (req.method === 'POST') {
//     await connectDB();
//     const { name, mobile, email, roll, branch } = req.body;

//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000);

//     try {
//       // Save user as pending (not verified yet)
//       await User.create({ name, mobile, email, roll, branch, isVerified: false });

//       // Send OTP via email
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS,
//         },
//       });

//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Your OTP Code',
//         text: `Your OTP is ${otp}`,
//       };

//       // Send OTP email
//       await transporter.sendMail(mailOptions);

//       // Respond with a success message
//       res.status(200).json({ message: 'OTP sent to email' });
//     } catch (error) {
//       // Handle errors (e.g., email sending failed, user creation failed)
//       console.error('Error in signup API:', error);
//       res.status(500).json({ message: 'Error signing up user', error: error.message });
//     }
//   } else {
//     // Method Not Allowed
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }
