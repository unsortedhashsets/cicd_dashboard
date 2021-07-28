export interface TokenModel {
  id: number;
  token: string;
  access: string;
  ci: number;
  user: number;
}

export const defaulToken: TokenModel = {
  id: 0,
  token: '',
  access: '',
  ci: 0,
  user: 0,
};
