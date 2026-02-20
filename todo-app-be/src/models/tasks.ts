import mongoose from "mongoose";

export interface ITasks {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

const tasksSchema = new mongoose.Schema<ITasks>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
});

const tasksModel = mongoose.model<ITasks>("Tasks", tasksSchema);

export default tasksModel;