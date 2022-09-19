export interface Login {
  email: string;
  password: string;
}

export interface Signup extends Login {
  first_name: string;
  last_name: string;
  confirmPassword: string;
}

export interface LoginResult {
  createdAt: string;
  email: string;
  isActive: boolean;
  password: string;
  updatedAt: string;
  username: string;
  __v: number;
  _id: string;
}
