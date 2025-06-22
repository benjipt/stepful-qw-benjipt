import type { paths } from '@/types/api';
import { API_BASE_URL } from '.';

export const POST_USER_ASSIGNMENT_SESSIONS_URL = `${API_BASE_URL}/api/user_assignment_sessions`;

export type CreateUserAssignmentSessionRequest = NonNullable<
  paths['/api/user_assignment_sessions']['post']['requestBody']
>['content']['application/json'];

export type CreateUserAssignmentSessionResponse =
  paths['/api/user_assignment_sessions']['post']['responses'][201]['content']['application/json'];

/**
 * Mutation function to create a user assignment session
 */
export async function createUserAssignmentSession(
  body: CreateUserAssignmentSessionRequest,
): Promise<CreateUserAssignmentSessionResponse> {
  const res = await fetch(POST_USER_ASSIGNMENT_SESSIONS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to create user assignment session');
  return res.json();
}
