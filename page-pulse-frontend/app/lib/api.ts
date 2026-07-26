import { AuditApiResponse } from '../types/audit';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function runAuditApi(url: string): Promise<AuditApiResponse> {
  const response = await fetch(`${API_BASE_URL}/audit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  const data: AuditApiResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to perform URL audit');
  }

  return data;
}