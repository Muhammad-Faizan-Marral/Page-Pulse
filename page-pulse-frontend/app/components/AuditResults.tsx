import { AuditApiResponse } from '../types/audit';
import MetricCard from './MetricCard';

interface AuditResultsProps {
  result: AuditApiResponse;
}

export default function AuditResults({ result }: AuditResultsProps) {
  const data = result.data;
  if (!data) return null;

  const isSuccessStatus = data.statusCode >= 200 && data.statusCode < 300;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Response Cache Status Bar */}
      <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-600 dark:text-gray-300">Request ID:</span>
          <code className="text-xs font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
            {result.requestId}
          </code>
        </div>
        <div>
          {result.cached ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              ⚡ Served from Redis Cache
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
              🌐 Fresh Network Fetch
            </span>
          )}
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="HTTP Status"
          value={`${data.statusCode} ${data.statusText}`}
          badgeColor={isSuccessStatus ? 'text-green-600' : 'text-red-600'}
        />
        <MetricCard
          label="Response Time"
          value={`${data.responseTimeMs} ms`}
          subValue={data.responseTimeMs < 500 ? 'Fast' : 'Slow'}
        />
        <MetricCard
          label="Content Length"
          value={data.contentLengthBytes ? `${(data.contentLengthBytes / 1024).toFixed(1)} KB` : 'N/A'}
        />
        <MetricCard
          label="Content Type"
          value={data.contentType ? data.contentType.split(';')[0] : 'N/A'}
        />
      </div>

      {/* Meta Analysis Box */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">
          Metadata & SEO Snapshot
        </h3>
        <div>
          <span className="text-xs font-medium text-gray-400 uppercase">Page Title</span>
          <p className="text-gray-800 dark:text-gray-200 font-medium mt-1">
            {data.meta.title || <span className="italic text-gray-400">No title detected</span>}
          </p>
        </div>
        <div>
          <span className="text-xs font-medium text-gray-400 uppercase">Meta Description</span>
          <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
            {data.meta.description || <span className="italic text-gray-400">No meta description detected</span>}
          </p>
        </div>
        <div>
          <span className="text-xs font-medium text-gray-400 uppercase">Heading 1 (H1)</span>
          <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
            {data.meta.h1 || <span className="italic text-gray-400">No H1 tag detected</span>}
          </p>
        </div>
      </div>
    </div>
  );
}