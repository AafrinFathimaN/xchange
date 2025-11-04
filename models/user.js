import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true },
}, { timestamps: true });

// Prevent model overwrite error in Next.js hot reload
export default mongoose.models.User || mongoose.model("User", UserSchema);
