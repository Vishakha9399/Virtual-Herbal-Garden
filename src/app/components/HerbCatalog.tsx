import { useState, useMemo } from "react";
import { Link } from "react-router";
import { herbs, Herb } from "../data/herbs";
import { Search, Sun, Droplets, Leaf, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { orderOnWhatsApp } from "../utils/whatsapp";

export function HerbCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

  const filteredHerbs = useMemo(() => {
    return herbs.filter((herb) => {
      const matchesSearch =
        herb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        herb.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        herb.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === "all" || herb.category === categoryFilter;
      const matchesDifficulty = difficultyFilter === "all" || herb.difficulty === difficultyFilter;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, categoryFilter, difficultyFilter]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      culinary: "bg-orange-100 text-orange-700 border-orange-200",
      medicinal: "bg-blue-100 text-blue-700 border-blue-200",
      aromatic: "bg-purple-100 text-purple-700 border-purple-200",
      ornamental: "bg-pink-100 text-pink-700 border-pink-200",
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      easy: "bg-green-100 text-green-700 border-green-200",
      moderate: "bg-yellow-100 text-yellow-700 border-yellow-200",
      difficult: "bg-red-100 text-red-700 border-red-200",
    };
    return colors[difficulty] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-4 text-gray-800">Herb Catalog</h1>
        <p className="text-lg text-gray-600">
          Explore our collection of {herbs.length} herbs and discover their unique properties
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search herbs by name, scientific name, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="culinary">Culinary</SelectItem>
              <SelectItem value="medicinal">Medicinal</SelectItem>
              <SelectItem value="aromatic">Aromatic</SelectItem>
              <SelectItem value="ornamental">Ornamental</SelectItem>
            </SelectContent>
          </Select>

          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="difficult">Difficult</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 text-gray-600">
        Showing {filteredHerbs.length} of {herbs.length} products
      </div>

      {/* Herb Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredHerbs.map((herb) => (
          <Card key={herb.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
            <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
              <img
                src={herb.image}
                alt={herb.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-green-600 text-white">
                  ₹{herb.price}
                </Badge>
              </div>
            </div>
            <CardContent className="pt-4 flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge className={getCategoryColor(herb.category)}>
                  {herb.category}
                </Badge>
                <Badge className={getDifficultyColor(herb.difficulty)}>
                  {herb.difficulty}
                </Badge>
              </div>
              <h3 className="text-xl mb-1 text-gray-800">{herb.name}</h3>
              <p className="text-sm text-gray-500 italic mb-2">{herb.scientificName}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg text-green-700">₹{herb.price}</span>
                <span className="text-sm text-gray-500">per {herb.unit}</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{herb.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1" title="Sunlight">
                  <Sun className="w-4 h-4 text-yellow-600" />
                  <span className="text-xs">{herb.sunlight === 'full sun' ? 'Full' : herb.sunlight === 'partial shade' ? 'Partial' : 'Shade'}</span>
                </div>
                <div className="flex items-center gap-1" title="Water">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span className="text-xs capitalize">{herb.water}</span>
                </div>
                <div className="flex items-center gap-1" title="Growth Time">
                  <Leaf className="w-4 h-4 text-green-600" />
                  <span className="text-xs">{herb.growthTime.split('-')[0]}</span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {herb.stock}
              </Badge>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Link to={`/catalog/${herb.id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
              <Button 
                onClick={() => orderOnWhatsApp(herb)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredHerbs.length === 0 && (
        <div className="text-center py-16">
          <Leaf className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600">No herbs found matching your criteria</p>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}