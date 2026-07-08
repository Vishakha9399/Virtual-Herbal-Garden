import { Card, CardContent } from "./ui/card";
import { Sprout, BookOpen, Heart, Target } from "lucide-react";

export function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Sprout className="w-16 h-16 mx-auto text-green-600 mb-4" />
          <h1 className="text-4xl mb-4 text-gray-800">About Virtual Herbal Garden</h1>
          <p className="text-lg text-gray-600">
            Your digital companion for exploring the wonderful world of herbs
          </p>
        </div>

        <div className="space-y-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl mb-3 text-gray-800">Our Mission</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Virtual Herbal Garden aims to make herbal knowledge accessible to everyone, whether
                    you're a beginner gardener, a culinary enthusiast, or someone interested in natural
                    remedies. We believe that understanding herbs and their properties can enhance both
                    your cooking and your well-being.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl mb-3 text-gray-800">What We Offer</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our platform provides comprehensive information about a wide variety of herbs,
                    including their health benefits, culinary uses, and growing requirements. Each herb
                    entry includes:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                      <span>Detailed botanical and common names</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                      <span>High-quality images for easy identification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                      <span>Growing difficulty levels and care instructions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                      <span>Health benefits and medicinal properties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                      <span>Culinary applications and usage tips</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl mb-3 text-gray-800">Why Choose Virtual Herbal Garden?</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Unlike physical gardening, our virtual garden allows you to:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                      <span>
                        Build a collection of your favorite herbs without space limitations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                      <span>
                        Access detailed care instructions and growing tips anytime
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                      <span>
                        Keep personal notes about your experiences with each herb
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                      <span>
                        Learn about herbs from different climates and regions
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl mb-3">Join Our Growing Community</h2>
            <p className="text-green-100 max-w-2xl mx-auto">
              Whether you're planning your first herb garden or expanding your herbal knowledge,
              Virtual Herbal Garden is here to support your journey. Start exploring today and
              discover the amazing world of herbs!
            </p>
          </CardContent>
        </Card>

        <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="text-lg mb-2 text-amber-900">Important Disclaimer</h3>
          <p className="text-sm text-amber-800 leading-relaxed">
            The information provided on Virtual Herbal Garden is for educational purposes only and
            should not be considered medical advice. Always consult with a qualified healthcare
            professional before using herbs for medicinal purposes, especially if you are pregnant,
            nursing, or taking medications. Some herbs may cause allergic reactions or interact with
            medications.
          </p>
        </div>
      </div>
    </div>
  );
}
