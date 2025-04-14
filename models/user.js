import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: { type: String, unique: true },
  roll: String,
  branch: String,
  isVerified: { type: Boolean, default: false },
  otp: String, // ✅ store OTP
});

export default mongoose.models.User || mongoose.model('User', userSchema);
