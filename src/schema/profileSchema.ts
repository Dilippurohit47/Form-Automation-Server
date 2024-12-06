import mongoose from "mongoose";
const ProfileSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
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
    experience:{
        type:String
    }
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", ProfileSchema);
export default Profile;
