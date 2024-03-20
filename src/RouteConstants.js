import { createBrowserRouter } from "react-router-dom";
import Home from "./Screens/Home/Home"

export const router = createBrowserRouter([
  {
    path: "/",
    element: < Home/>,
  },
]);
export default router;
