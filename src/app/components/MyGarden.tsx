import { useState, useEffect } from "react";
import { Link } from "react-router";
import { herbs } from "../data/herbs";
import { Flower2, Trash2, Calendar, StickyNote, Plus } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface GardenItem {
  id: string;
  addedDate: string;
  notes: string;
}

export function MyGarden() {
  const [gardenItems, setGardenItems] = useState<GardenItem[]>([]);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesText, setNotesText] = useState("");

  useEffect(() => {
    loadGarden();
  }, []);

  const loadGarden = () => {
    const savedGarden = localStorage.getItem("myGarden");
    const garden = savedGarden ? JSON.parse(savedGarden) : [];
    setGardenItems(garden);
  };

  const removeFromGarden = (herbId: string) => {
    const filtered = gardenItems.filter((item) => item.id !== herbId);
    localStorage.setItem("myGarden", JSON.stringify(filtered));
    setGardenItems(filtered);
  };

  const saveNotes = (herbId: string) => {
    const updated = gardenItems.map((item) =>
      item.id === herbId ? { ...item, notes: notesText } : item
    );
    localStorage.setItem("myGarden", JSON.stringify(updated));
    setGardenItems(updated);
    setEditingNotes(null);
    setNotesText("");
  };

  const openNotesDialog = (herbId: string, currentNotes: string) => {
    setEditingNotes(herbId);
    setNotesText(currentNotes);
  };

  const gardenHerbs = gardenItems.map((item) => ({
    ...herbs.find((h) => h.id === item.id)!,
    addedDate: item.addedDate,
    notes: item.notes,
  }));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (gardenItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl mb-4 text-gray-800">My Virtual Garden</h1>
        <Card className="text-center py-16">
          <CardContent>
            <Flower2 className="w-24 h-24 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl mb-2 text-gray-700">Your Garden is Empty</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start building your virtual herb collection by adding herbs from our catalog
            </p>
            <Link to="/catalog">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-5 h-5 mr-2" />
                Browse Herb Catalog
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-4 text-gray-800">My Virtual Garden</h1>
        <p className="text-lg text-gray-600">
          You have {gardenItems.length} {gardenItems.length === 1 ? "herb" : "herbs"} in your collection
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gardenHerbs.map((herb) => (
          <Card key={herb.id} className="overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={herb.image}
                alt={herb.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{herb.name}</CardTitle>
              <p className="text-sm text-gray-500 italic">{herb.scientificName}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <Calendar className="w-4 h-4" />
                <span>Added {formatDate(herb.addedDate)}</span>
              </div>
            </CardHeader>
            <CardContent>
              {herb.notes ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                  <div className="flex items-start gap-2">
                    <StickyNote className="w-4 h-4 text-yellow-700 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{herb.notes}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-3 italic">No notes added yet</p>
              )}

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => openNotesDialog(herb.id, herb.notes)}
                    >
                      <StickyNote className="w-4 h-4 mr-2" />
                      {herb.notes ? "Edit Notes" : "Add Notes"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Notes for {herb.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Textarea
                        value={notesText}
                        onChange={(e) => setNotesText(e.target.value)}
                        placeholder="Add your growing notes, observations, or reminders..."
                        rows={6}
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => saveNotes(herb.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          Save Notes
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFromGarden(herb.id)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/catalog/${herb.id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="mt-8 bg-green-50 border-green-200">
        <CardContent className="py-8 text-center">
          <h3 className="text-xl mb-2 text-gray-800">Want to add more herbs?</h3>
          <p className="text-gray-600 mb-4">
            Explore our catalog to discover more amazing herbs for your collection
          </p>
          <Link to="/catalog">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-5 h-5 mr-2" />
              Browse Herb Catalog
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
