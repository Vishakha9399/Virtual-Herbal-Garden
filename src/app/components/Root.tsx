import { Outlet, Link, useLocation } from "react-router";
import { Sprout, BookOpen, Flower2, Info } from "lucide-react";

export function Root() {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: Sprout },
    { path: "/catalog", label: "Herb Catalog", icon: BookOpen },
    { path: "/garden", label: "My Garden", icon: Flower2 },
    { path: "/about", label: "About", icon: Info },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <Sprout className="w-8 h-8 text-green-600" />
              <span className="text-xl text-green-800">Virtual Herbal Garden</span>
            </Link>
            
            <nav className="hidden md:flex gap-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-green-100 text-green-700"
                        : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <nav className="flex md:hidden gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`p-2 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-green-100 text-green-700"
                        : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2026 Virtual Herbal Garden. Cultivating knowledge, naturally.</p>
            <p className="text-sm text-gray-500">Explore, learn, and grow your virtual herb collection.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
