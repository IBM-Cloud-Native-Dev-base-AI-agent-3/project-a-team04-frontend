export interface DummyUser {
  id: number;
  email: string;
  password: string;
  name: string;
}

export const DUMMY_USERS: DummyUser[] = [
  {
    id: 1,
    email: 'user1@example.com',
    password: 'password',
    name: 'User One',
  },
  {
    id: 2,
    email: 'user2@example.com',
    password: 'password',
    name: 'User Two',
  },
];
