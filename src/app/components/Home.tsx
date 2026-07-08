import { Link } from "react-router";
import { Sprout, BookOpen, Flower2, Leaf, Sun, Droplets } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Extensive Herb Library",
      description: "Explore our comprehensive catalog of herbs with detailed information about each plant.",
    },
    {
      icon: Flower2,
      title: "Virtual Garden",
      description: "Create and manage your personal virtual herb garden with your favorite plants.",
    },
    {
      icon: Leaf,
      title: "Care Instructions",
      description: "Learn how to properly care for each herb with detailed growing guides.",
    },
    {
      icon: Sun,
      title: "Growing Tips",
      description: "Discover the best practices for sunlight, watering, and soil requirements.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1652556532650-f711fa97d090?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBoZXJicyUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzczODU4NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080)'
        }}
      >
        <div className="container mx-auto text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl mb-6">Welcome to Your Virtual Herbal Garden</h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Discover, learn, and cultivate your knowledge of medicinal and culinary herbs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Herbs
                </Button>
              </Link>
              <Link to="/garden">
                <Button size="lg" variant="outline" className="bg-white/90 hover:bg-white px-8">
                  <Flower2 className="w-5 h-5 mr-2" />
                  My Garden
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-800 mb-4">
              Everything You Need to Grow Your Herbal Knowledge
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From beginner to expert, our platform provides all the tools and information you need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-green-100 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl mb-2 text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl text-green-600 mb-2">38+</div>
              <p className="text-xl text-gray-700">Herbs & Spices</p>
            </div>
            <div>
              <div className="text-5xl text-green-600 mb-2">
                <Leaf className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-xl text-gray-700">Detailed Care Guides</p>
            </div>
            <div>
              <div className="text-5xl text-green-600 mb-2">
                <Droplets className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-xl text-gray-700">Growing Tips</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
            <CardContent className="py-12 text-center">
              <Sprout className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl mb-4">Start Your Herbal Journey Today</h2>
              <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
                Build your virtual garden and discover the wonderful world of herbs
              </p>
              <Link to="/catalog">
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 px-8">
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}