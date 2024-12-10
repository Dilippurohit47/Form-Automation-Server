import mongoose from "mongoose";
const ProfileSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    firstName: {
      type: String,
    },
    email: {
      type: String,
      unique: false
    },
    fullName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    linkedInUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    portfolioUrl: {
      type: String,
    },
    experience: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", ProfileSchema);
export default Profile;
