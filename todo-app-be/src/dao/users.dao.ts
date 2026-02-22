import usersModel, { IUsers } from "../models/users";

export default class UsersDAO {
  async findAll() {
    return await usersModel.find().select("-password");
  }

  async findByEmail(email: string) {
    return await usersModel.findOne({ email });
  }

  async findByUsername(username: string) {
    return await usersModel.findOne({ username });
  }

  async findById(id: string) {
    return await usersModel.findById(id).select("-password");
  }

  async create(userData: IUsers) {
    const user = new usersModel(userData);
    return await user.save();
  }

  async deleteById(id: string) {
    return await usersModel.findByIdAndDelete(id);
  }
}
