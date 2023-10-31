export interface User {
  _Id: string;
  email: string;
  first_Name: string;
  last_Name: string;
  salt: string;
  email_Authorization: boolean;
  userActivity: UserActivity;
  permission: Permission;
  providers: string[];
}

export type ResetPasswordUser = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

export type NewUser = {
  email: string;
  first_Name: string;
  last_Name: string;
  password: string;
  confirmPassword: string;
  providers: string[];
};

export type LoginUser = {
  email: string;
  password: string;
};
export interface UserActivity {
  accountCreated: string;
  lastLogin: string;
}

export interface Permission {
  role: string;
  level: number;
}
