import { service_path } from '@/service/service_ip_port';
import { getAccessToken } from '@/auth/authService';

export interface ForumListResponse {
  id: number;
  slug: string;
  status: 'UPCOMING' | 'IN_PROGRESS' | 'CLOSED' | 'FINISHED';
  statusLabel: string;
  eventDate: string;
  thumbnailUrl: string;
  maxParticipants: number;
  acceptedCount: number;
  title: string;
  location: string;
  speakers: string;
  createdAt: string;
}

export interface ForumDetailResponse {
  id: number;
  userId: number;
  title: string;
  content: string;
  viewCount: number;
  speakers?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplyRequest {
  note: string;
}

const getAuthHeaders = () => {
  const token = getAccessToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export async function getForums(locale: string = 'ko'): Promise<ForumListResponse[]> {
  const response = await fetch(`${service_path}/forums?locale=${locale}`);
  if (!response.ok) throw new Error(`GET /forums failed: ${response.status}`);
  return (await response.json()) as ForumListResponse[];
}

export async function getForumDetail(forumId: number, locale: string = 'ko'): Promise<ForumDetailResponse> {
  const response = await fetch(`${service_path}/forums/${forumId}?locale=${locale}`);
  if (!response.ok) throw new Error(`GET /forums/${forumId} failed: ${response.status}`);
  return (await response.json()) as ForumDetailResponse;
}

export async function applyForum(forumId: number, request: ApplyRequest): Promise<any> {
  const response = await fetch(`${service_path}/forums/${forumId}/registrations`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error(`POST /forums/${forumId}/registrations failed: ${response.status}`);
  return await response.json();
}

export async function getMyRegistration(forumId: number): Promise<any> {
  const response = await fetch(`${service_path}/forums/${forumId}/my-registration`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error(`GET /forums/${forumId}/my-registration failed: ${response.status}`);
  return await response.json();
}
