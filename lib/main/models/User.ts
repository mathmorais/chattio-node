import { ObjectId } from "bson";
import mongoose, { Schema } from "mongoose";
import { IUser } from "../../core/interfaces/IUser";

const UserSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
  friends: [
    {
      _id: false,
      user: { type: ObjectId, ref: "user", required: false },
      roomId: { type: String, required: false },
      pending: { type: Boolean, default: true },
    },
  ],
});

export const UserModel = mongoose.model<IUser>("user", UserSchema);
