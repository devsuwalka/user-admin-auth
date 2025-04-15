// app/api/verify-otp/route.js
import connectDB from "@/lib/db";
import User from '../../../models/user'; //



export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { email, otp, actualOtp } = body;

  // Step 1: Verify OTP (in real apps, compare from DB or cache)
  if (otp !== actualOtp) {
    return new Response(JSON.stringify({ message: "Invalid OTP" }), { status: 400 });
  }

  // Step 2: Update user's isVerified to true
  const user = await User.findOneAndUpdate(
    { email },
    { isVerified: true },
    { new: true }
  );

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
  }

  return new Response(JSON.stringify({ message: "Email verified successfully", user }), { status: 200 });
}
