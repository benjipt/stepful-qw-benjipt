import { toStringParams } from '@/lib/utils';
import type { paths } from '@/types/api';
import { API_BASE_URL } from '.';

/**
 * User type returned from /api/users
 */
export type User =
  paths['/api/users']['get']['responses'][200]['content']['application/json'][number];

/**
 * Loader function to fetch users from /api/users
 */
export async function loadUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE_URL}/api/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

/**
 * UserAssignment type returned from /api/user_assignments
 */
export type UserAssignment =
  paths['/api/user_assignments']['get']['responses'][200]['content']['application/json'][number];

/**
 * Params type for loading user assignments
 */
export type LoadUserAssignmentsParams =
  paths['/api/user_assignments']['get']['parameters']['query'];

/**
 * Loader function to fetch user assignments from /api/user_assignments
 */
export async function loadUserAssignments(
  params: LoadUserAssignmentsParams,
): Promise<UserAssignment[]> {
  const query = new URLSearchParams(toStringParams(params));
  const res = await fetch(`${API_BASE_URL}/api/user_assignments?${query}`);
  if (!res.ok) throw new Error('Failed to fetch user assignments');
  return res.json();
}

/**
 * AssignmentQuestion type returned from /api/user_assignments/{userAssignmentId}/questions
 */
export type AssignmentQuestion =
  paths['/api/user_assignments/{userAssignmentId}/questions']['get']['responses'][200]['content']['application/json'][number];

/**
 * Params type for loading assignment questions
 */
export type LoadAssignmentQuestionsParams =
  paths['/api/user_assignments/{userAssignmentId}/questions']['get']['parameters']['path'] &
    paths['/api/user_assignments/{userAssignmentId}/questions']['get']['parameters']['query'];

/**
 * Loader function to fetch assignment questions from /api/user_assignments/{user_assignment_id}/questions
 */
export async function loadAssignmentQuestions(
  params: LoadAssignmentQuestionsParams,
): Promise<AssignmentQuestion[]> {
  const { userAssignmentId, userAssignmentSessionId } = params;
  const query = new URLSearchParams({ userAssignmentSessionId });
  const res = await fetch(
    `${API_BASE_URL}/api/user_assignments/${userAssignmentId}/questions?${query}`,
  );
  if (res.status === 403) {
    const error = new Error('Forbidden');
    (error as any).status = 403;
    throw error;
  }
  if (!res.ok) throw new Error('Failed to fetch assignment questions');
  return res.json();
}

/**
 * Params type for loading a user assignment by ID
 */
export type LoadUserAssignmentByIdParams =
  paths['/api/user_assignments/{id}']['get']['parameters']['path'];

/**
 * Loader function to fetch a single user assignment from /api/user_assignments/{id}
 */
export async function loadUserAssignmentById(
  params: LoadUserAssignmentByIdParams,
): Promise<UserAssignment> {
  const { id } = params;
  const res = await fetch(`${API_BASE_URL}/api/user_assignments/${id}`);
  if (!res.ok) throw new Error('Failed to fetch user assignment');
  return res.json();
}
