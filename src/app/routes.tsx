import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { HerbCatalog } from "./components/HerbCatalog";
import { HerbDetail } from "./components/HerbDetail";
import { MyGarden } from "./components/MyGarden";
import { About } from "./components/About";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "catalog", Component: HerbCatalog },
      { path: "catalog/:herbId", Component: HerbDetail },
      { path: "garden", Component: MyGarden },
      { path: "about", Component: About },
      { path: "*", Component: NotFound },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});
