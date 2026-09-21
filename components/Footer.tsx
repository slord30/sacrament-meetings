export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500 tracking-wide">
        &copy; {currentYear} SACRAMENT MEETING PLANNER. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
