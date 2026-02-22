import mongoose from "mongoose";

export interface IUsers {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

const usersSchema = new mongoose.Schema<IUsers>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const usersModel = mongoose.model<IUsers>("Users", usersSchema);

export default usersModel;
