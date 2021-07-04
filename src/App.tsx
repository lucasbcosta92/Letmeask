import { BrowserRouter, Route, Switch } from "react-router-dom";
// Context
import { AuthContextProvider } from "./contexts/AuthContext";
// pages
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          {/* Switch - Impede duas rotas de renderizarem juntas */}
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
