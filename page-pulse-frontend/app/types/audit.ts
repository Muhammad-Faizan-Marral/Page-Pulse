export interface AuditMeta {
  title: string | null;
  description: string | null;
  h1: string | null;
}

export interface AuditResultData {
  url: string;
  statusCode: number;
  statusText: string;
  responseTimeMs: number;
  contentType: string | null;
  contentLengthBytes: number | null;
  meta: AuditMeta;
  auditedAt: string;
}

export interface AuditApiResponse {
  status: 'success' | 'error';
  cached?: boolean;
  requestId?: string;
  data?: AuditResultData;
  message?: string;
  code?: string;
}