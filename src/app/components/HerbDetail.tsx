import { useParams, Link, useNavigate } from "react-router";
import { herbs } from "../data/herbs";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Plus, Check, Sun, Droplets, Leaf, Clock, Award, ShoppingCart, Package } from "lucide-react";
import { useState, useEffect } from "react";
import { orderOnWhatsApp } from "../utils/whatsapp";

export function HerbDetail() {
  const { herbId } = useParams();
  const navigate = useNavigate();
  const herb = herbs.find((h) => h.id === herbId);
  const [isInGarden, setIsInGarden] = useState(false);

  useEffect(() => {
    if (herb) {
      const savedGarden = localStorage.getItem("myGarden");
      const garden = savedGarden ? JSON.parse(savedGarden) : [];
      setIsInGarden(garden.some((item: any) => item.id === herb.id));
    }
  }, [herb]);

  if (!herb) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl mb-4 text-gray-800">Herb Not Found</h1>
        <p className="text-gray-600 mb-8">The herb you're looking for doesn't exist in our catalog.</p>
        <Link to="/catalog">
          <Button className="bg-green-600 hover:bg-green-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Button>
        </Link>
      </div>
    );
  }

  const handleAddToGarden = () => {
    const savedGarden = localStorage.getItem("myGarden");
    const garden = savedGarden ? JSON.parse(savedGarden) : [];
    
    if (!garden.some((item: any) => item.id === herb.id)) {
      garden.push({
        id: herb.id,
        addedDate: new Date().toISOString(),
        notes: "",
      });
      localStorage.setItem("myGarden", JSON.stringify(garden));
      setIsInGarden(true);
    }
  };

  const handleRemoveFromGarden = () => {
    const savedGarden = localStorage.getItem("myGarden");
    const garden = savedGarden ? JSON.parse(savedGarden) : [];
    const filtered = garden.filter((item: any) => item.id !== herb.id);
    localStorage.setItem("myGarden", JSON.stringify(filtered));
    setIsInGarden(false);
  };

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
      <Button
        variant="ghost"
        onClick={() => navigate("/catalog")}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Catalog
      </Button>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Image Section */}
        <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 shadow-lg">
          <img
            src={herb.image}
            alt={herb.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Section */}
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className={getCategoryColor(herb.category)}>
              {herb.category}
            </Badge>
            <Badge className={getDifficultyColor(herb.difficulty)}>
              {herb.difficulty}
            </Badge>
            <Badge variant="outline" className="border-green-600 text-green-700">
              {herb.stock}
            </Badge>
          </div>

          <h1 className="text-4xl mb-2 text-gray-800">{herb.name}</h1>
          <p className="text-lg text-gray-500 italic mb-4">{herb.scientificName}</p>

          {/* Price Section */}
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Price</p>
                  <p className="text-3xl text-green-700">₹{herb.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Unit</p>
                  <p className="text-xl text-gray-700">{herb.unit}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-lg text-gray-700 mb-6">{herb.description}</p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Sun className="w-8 h-8 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-500">Sunlight</p>
                    <p className="capitalize text-gray-800">{herb.sunlight}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Droplets className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Water Needs</p>
                    <p className="capitalize text-gray-800">{herb.water}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Growth Time</p>
                    <p className="text-gray-800">{herb.growthTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Difficulty</p>
                    <p className="capitalize text-gray-800">{herb.difficulty}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => orderOnWhatsApp(herb)}
              className="flex-1 bg-green-600 hover:bg-green-700 h-12 text-base"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Buy Now via WhatsApp
            </Button>
            
            {isInGarden ? (
              <Button
                onClick={handleRemoveFromGarden}
                variant="outline"
                className="border-green-600 text-green-700 hover:bg-green-50"
              >
                <Check className="w-5 h-5 mr-2" />
                In Garden
              </Button>
            ) : (
              <Button
                onClick={handleAddToGarden}
                variant="outline"
                className="border-green-600 text-green-700 hover:bg-green-50"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add to Garden
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Leaf className="w-6 h-6 text-green-600" />
            Health Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-3">
            {herb.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Uses Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Common Uses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {herb.uses.map((use, index) => (
              <Badge key={index} variant="outline" className="text-base py-2 px-4">
                {use}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Care Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Care Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="flex items-center gap-2 mb-2 text-gray-800">
                <Droplets className="w-5 h-5 text-blue-600" />
                Watering
              </h4>
              <p className="text-gray-700 pl-7">{herb.careInstructions.watering}</p>
            </div>

            <div>
              <h4 className="flex items-center gap-2 mb-2 text-gray-800">
                <Sun className="w-5 h-5 text-yellow-600" />
                Sunlight
              </h4>
              <p className="text-gray-700 pl-7">{herb.careInstructions.sunlight}</p>
            </div>

            <div>
              <h4 className="flex items-center gap-2 mb-2 text-gray-800">
                <Leaf className="w-5 h-5 text-brown-600" />
                Soil
              </h4>
              <p className="text-gray-700 pl-7">{herb.careInstructions.soil}</p>
            </div>

            <div>
              <h4 className="flex items-center gap-2 mb-2 text-gray-800">
                <Leaf className="w-5 h-5 text-green-600" />
                Pruning
              </h4>
              <p className="text-gray-700 pl-7">{herb.careInstructions.pruning}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}