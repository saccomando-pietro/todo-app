export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
};

export const users: User[] = [
  {
    _id: "user1",
    username: "user1",
    email: "user1@example.com",
    password: "password1",
  },
  {
    _id: "user2",
    username: "user2",
    email: "user2@example.com",
    password: "password2",
  },
];
