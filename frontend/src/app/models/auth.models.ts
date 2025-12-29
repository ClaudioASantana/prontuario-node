export interface LoginDto {
  email?: string;
  password?: string;
  login?: string; // Support for login/email field
}

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}
