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

export interface UpdateProfileRequest {
  nickname?: string;
  profileImageUrl?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface WithdrawalRequest {
  password?: string;
  reason: string;
}

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await response.json();

      if (typeof data === 'string') {
        return data;
      }

      if (data && typeof data === 'object') {
        return data.message || data.error || data.detail || data.code || `Request failed with status ${response.status}`;
      }
    }

    const text = await response.text();
    return text || `Request failed with status ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
}

export async function signup(request: SignupRequest): Promise<ProfileResponse> {
  const response = await fetch(`${service_path}/users/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
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
    throw new Error(await parseErrorMessage(response));
  }

  return (await response.json()) as ProfileResponse;
}

export async function updateProfile(request: UpdateProfileRequest): Promise<ProfileResponse> {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('No access token available');
  }

  const response = await fetch(`${service_path}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return (await response.json()) as ProfileResponse;
}

export async function withdraw(request: WithdrawalRequest): Promise<void> {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('No access token available');
  }

  const response = await fetch(`${service_path}/users/me`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }
}