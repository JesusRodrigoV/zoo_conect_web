export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number | null;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface LogoutRequest {
  refresh_token: string;
}

export interface LogoutResponse {
  msg: string;
}