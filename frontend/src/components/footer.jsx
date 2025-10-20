export function Footer() {
  return (
    <footer className="
      bg-card dark:bg-neutral-900
      border-t border-muted dark:border-gray-800
      text-center py-6 mt-8
    ">
      <p className="text-foreground/80 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} MyPortfolio. All rights reserved.
      </p>
    </footer>
  );
}
