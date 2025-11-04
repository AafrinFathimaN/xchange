import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  skill: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
