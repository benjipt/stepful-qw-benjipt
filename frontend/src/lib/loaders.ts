import { toStringParams } from '@/lib/utils';
import type { paths } from '@/types/api';

export type User =
  paths['/api/users']['get']['responses'][200]['content']['application/json'][number];

export type UserAssignment =
  paths['/api/user_assignments']['get']['responses'][200]['content']['application/json'][number];

export type LoadUserAssignmentsParams =
  paths['/api/user_assignments']['get']['parameters']['query'];

export type AssignmentQuestion =
  paths['/api/user_assignments/{userAssignmentId}/questions']['get']['responses'][200]['content']['application/json'][number];

export type LoadAssignmentQuestionsParams =
  paths['/api/user_assignments/{userAssignmentId}/questions']['get']['parameters']['path'];

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
 * Loader function to fetch assignment questions from /api/user_assignments/{user_assignment_id}/questions
 */
export async function loadAssignmentQuestions(
  params: LoadAssignmentQuestionsParams,
): Promise<AssignmentQuestion[]> {
  const { userAssignmentId } = params;
  const res = await fetch(
    `${API_BASE_URL}/api/user_assignments/${userAssignmentId}/questions`,
  );
  if (!res.ok) throw new Error('Failed to fetch assignment questions');
  return res.json();
}
