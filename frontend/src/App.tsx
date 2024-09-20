import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./routes/login";

function App() {
  const router = createBrowserRouter([{ path: "/", element: <LoginPage /> }]);
  return <RouterProvider router={router} />;
}

export default App;
