import { ObjectId } from "bson";
import mongoose, { Schema } from "mongoose";
import { IUser } from "../../core/interfaces/entities/IUser";

const UserSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
  friendRequests: [
    {
      _id: false,
      user: { type: ObjectId, ref: "user", required: true },
    },
  ],
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
