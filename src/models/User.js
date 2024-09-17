import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, unique: true },
  name: { type: String },
  profilePicture: { type: String },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;