import { BrowserRouter } from "react-router-dom";
import Router from "./services/routes";
// const queryClient = new QueryClient();

function App() {
  return (
      <BrowserRouter>
        <Router />
      </BrowserRouter>
  );
}

export default App;
