import { service_path } from '@/service/service_ip_port';
import { getAccessToken } from '@/auth/authService';

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

export async function getMyProfile(): Promise<ProfileResponse> {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('No access token available');
  }

  const response = await fetch(`${service_path}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`GET /users/me failed: ${response.status}`);
  }

  return (await response.json()) as ProfileResponse;
}
