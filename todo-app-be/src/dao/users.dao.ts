import usersModel, { IUsers } from "../models/users";

export default class UsersDAO {
  async findByEmail(email: string) {
    return await usersModel.findOne({ email });
  }

  async findById(id: string) {
    return await usersModel.findById(id);
  }

  async create(userData: IUsers) {
    const user = new usersModel(userData);
    return await user.save();
  }
}
