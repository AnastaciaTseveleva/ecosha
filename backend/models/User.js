import mongoose from "mongoose";
const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: [String],
    required: true,
  },
  favourite: {
    type: [String],
    required: true,
  },
});
export default mongoose.model("User", usersSchema);
