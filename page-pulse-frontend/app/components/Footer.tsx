export default function Footer() {
  return (
    <footer className="w-full py-6 mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-center text-sm text-gray-600 dark:text-gray-400">
      <div className="container mx-auto px-4">
        <p>
          Built for{' '}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            Digital Heroes Training Task
          </a>
        </p>
      </div>
    </footer>
  );
}