export interface UserModel {
  id: number | null;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface LoginUserModel extends UserModel {
  isLogin: boolean;
}

export const defaultUserModel: UserModel = {
  id: null,
  username: '',
  first_name: '',
  last_name: '',
  email: '',
};

export const user: LoginUserModel = {
  id: null,
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  isLogin: false,
};

export const setUserModel = (new_user: any) => {
  user.id = new_user.id;
  user.username = new_user.username;
  user.first_name = new_user.first_name;
  user.last_name = new_user.last_name;
  user.email = new_user.email;
};
