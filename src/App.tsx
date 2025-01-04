import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
