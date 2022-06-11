export interface AppState {
  user: {
    accessToken: string;
    isAdmin: boolean;
    refreshToken: string;
    username: string;
  } | null;
  username: string;
  email: string;
  password: string;
  roles: Array<string>;
  success: boolean;
  error: boolean;
  modalInterface: boolean;
}
