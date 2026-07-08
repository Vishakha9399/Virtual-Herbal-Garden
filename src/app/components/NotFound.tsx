import { Link } from "react-router";
import { Flower2 } from "lucide-react";
import { Button } from "./ui/button";

export function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <Flower2 className="w-24 h-24 mx-auto text-gray-400 mb-6" />
      <h1 className="text-6xl mb-4 text-gray-800">404</h1>
      <h2 className="text-3xl mb-4 text-gray-700">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Link to="/">
        <Button className="bg-green-600 hover:bg-green-700">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
