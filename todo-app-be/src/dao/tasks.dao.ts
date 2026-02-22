import tasksModel, { ITasks } from "../models/tasks";

class TasksDAO {
  async findAll() {
    return await tasksModel.find();
  }

  async findByUserId(userId: string) {
    return await tasksModel.find({ userId });
  }

  async create(task: ITasks) {
    return await tasksModel.create(task);
  }

  async findById(id: string) {
    return await tasksModel.findById(id);
  }

  async updateCompleted(id: string, completed: boolean) {
    return await tasksModel.findByIdAndUpdate(
      id,
      {
        completed,
        updatedAt: new Date(),
      },
      { new: true },
    );
  }

  async deleteById(id: string) {
    return await tasksModel.findByIdAndDelete(id);
  }
}

export default TasksDAO;
