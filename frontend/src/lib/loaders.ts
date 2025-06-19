import type { paths } from '@/types/api';

// Type for GET /api/users response

export type User =
  paths['/api/users']['get']['responses'][200]['content']['application/json'][number];

const BE_PORT = import.meta.env.VITE_BE_PORT ?? '3000';
const API_BASE_URL = `http://localhost:${BE_PORT}`;

/**
 * Loader function to fetch users from /api/users
 */
export async function loadUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE_URL}/api/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}
