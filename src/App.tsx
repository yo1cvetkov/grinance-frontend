import { Button, NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
      <div className="text-red-500">
        <Button>Click me</Button>
      </div>
    </NextUIProvider>
  );
}

export default App;
