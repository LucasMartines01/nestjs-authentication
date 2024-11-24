export interface IAuthGateway {
  login(email: string, password: string): Promise<{ access_token: string }>;
}
