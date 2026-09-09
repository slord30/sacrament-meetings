import NavLinks from './NavLinks';

export default function Header() {
  // Dynamically format today's date safely
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          {/* Formatted in clean, intentional all-caps style */}
          <h1 className="text-xl font-bold tracking-widest text-gray-900">
            COLLEGE PARK WARD PLANNER
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5 uppercase tracking-wider">
            {today}
          </p>
        </div>
        
        <NavLinks />
      </div>
    </header>
  );
}
