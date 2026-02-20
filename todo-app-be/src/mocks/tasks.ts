export type Task = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export const tasks: Task[] = [
  {
    _id: "1",
    title: "Task 1",
    description: "Description for Task 1",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user1",
  },
  {
    _id: "2",
    title: "Task 2",
    description: "Description for Task 2",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user2",
  },
  {
    _id: "3",
    title: "Task 3",
    description: "Description for Task 3",
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user1",
  },
];
