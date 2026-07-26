interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  badgeColor?: string;
}

export default function MetricCard({ label, value, subValue, badgeColor }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {label}
      </span>
      <div className="mt-2 flex items-baseline justify-between">
        <span className={`text-2xl font-bold ${badgeColor || 'text-gray-900 dark:text-white'}`}>
          {value}
        </span>
        {subValue && (
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
}