export interface TokenModel {
  id: number;
  token: string;
  ci: number;
  user: number;
}

export const defaulToken: TokenModel = {
  id: 0,
  token: '',
  ci: 0,
  user: 0,
};
