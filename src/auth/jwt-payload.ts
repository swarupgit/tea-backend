export interface JwtPayload {
  mobile: string;
  email: string;
  expiresIn?: string;
  iat?: number;
  exp?: number;
}
