export interface AuthResponse {
  token: string;
  error?: 'user_not_found' | 'invalid_password' | 'user_already_exists';
}

export type ErrorType = 'user_not_found' | 'invalid_password' | 'user_already_exists'