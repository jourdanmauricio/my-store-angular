export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface createUserDto extends Omit<User, 'id'> {}
