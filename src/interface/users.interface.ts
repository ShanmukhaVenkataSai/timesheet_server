export interface Login {
  username: string;
  password: string;
}

export interface Signup extends Login {
  email: string;
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
