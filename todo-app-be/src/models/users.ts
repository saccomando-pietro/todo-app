import mongoose from "mongoose";

export interface IUsers {
  username: string;
  email: string;
  password: string;
}

const usersSchema = new mongoose.Schema<IUsers>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const usersModel = mongoose.model<IUsers>("Users", usersSchema);

export default usersModel;
