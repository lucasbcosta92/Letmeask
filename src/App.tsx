import { BrowserRouter, Route } from "react-router-dom";
// pages
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
// Context
import { AuthContextProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
