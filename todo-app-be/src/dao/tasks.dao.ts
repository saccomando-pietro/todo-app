import tasksModel, { ITasks } from "../models/tasks";

class TasksDAO {
  async getAll() {
    return await tasksModel.find();
  }

  async getByUserId(userId: string) {
    return await tasksModel.find({ userId });
  }

  async create(task: ITasks) {
    return await tasksModel.create(task);
  }

  async getById(id: string) {
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
}

export default TasksDAO;
