import type { paths } from '@/types/api';
import { API_BASE_URL } from '.';

const POST_USER_ASSIGNMENT_SESSIONS_URL = `${API_BASE_URL}/api/user_assignment_sessions`;

/**
 * Request type for creating a user assignment session
 */
export type CreateUserAssignmentSessionRequest = NonNullable<
  paths['/api/user_assignment_sessions']['post']['requestBody']
>['content']['application/json'];

/**
 * Response type for creating a user assignment session
 */
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

/**
 * Request type for closing a user assignment session
 */
export type CloseUserAssignmentSessionRequest = {
  id: number;
};

/**
 * Response type for closing a user assignment session
 */
export type CloseUserAssignmentSessionResponse =
  paths['/api/user_assignment_sessions/{id}']['patch']['responses'][200]['content']['application/json'];

/**
 * Mutation function to close a user assignment session
 */
export async function closeUserAssignmentSession({
  id,
}: CloseUserAssignmentSessionRequest): Promise<CloseUserAssignmentSessionResponse> {
  const url = `${API_BASE_URL}/api/user_assignment_sessions/${id}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to close user assignment session');
  return res.json();
}

const POST_USER_ASSIGNMENT_QUESTION_URL = (userAssignmentId: number) =>
  `${API_BASE_URL}/api/user_assignments/${userAssignmentId}/questions`;

/**
 * Request type for saving a user assignment question response
 */
// FLAT version for Rails compatibility
export type SaveUserAssignmentQuestionRequest = {
  userAssignmentId: number;
  assignmentQuestionId: number;
  response: string;
};

/**
 * Response type for saving a user assignment question response
 */
export type SaveUserAssignmentQuestionResponse =
  paths['/api/user_assignments/{userAssignmentId}/questions']['post']['responses'][201]['content']['application/json'];

/**
 * Mutation function to save a user assignment question response
 */
export async function saveUserAssignmentQuestion({
  userAssignmentId,
  assignmentQuestionId,
  response,
}: SaveUserAssignmentQuestionRequest): Promise<SaveUserAssignmentQuestionResponse> {
  const res = await fetch(POST_USER_ASSIGNMENT_QUESTION_URL(userAssignmentId), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userAssignmentId,
      assignmentQuestionId,
      response,
    }),
  });
  if (!res.ok)
    throw new Error('Failed to save user assignment question response');
  return res.json();
}
