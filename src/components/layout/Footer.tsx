export function Footer() {
  return (
    <footer className="py-8 mt-auto border-t border-surface-200/50 dark:border-surface-800/50 transition-colors">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-medium text-surface-500 dark:text-surface-400">
          &copy; {new Date().getFullYear()} Kalender Libur Nasional Indonesia. 
        </p>
        <p className="text-xs text-surface-400 dark:text-surface-500 mt-1">
          Dibuat untuk memudahkan harimu.
        </p>
      </div>
    </footer>
  );
}
