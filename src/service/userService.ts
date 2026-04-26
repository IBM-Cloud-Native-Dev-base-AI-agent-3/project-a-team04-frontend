import { service_path } from './service_ip_port';

export type UserRole = 'ROLE_USER' | 'ROLE_ADMIN';

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
  role: UserRole;
}

export interface ProfileResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  role: UserRole;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export async function signup(request: SignupRequest): Promise<ProfileResponse> {
  const response = await fetch(`${service_path}/users/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`POST /users/signup failed: ${response.status}`);
  }

  return (await response.json()) as ProfileResponse;
}
