import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { Dashboard } from "./pages";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="p-8 bg-[#3b3b3b]">
      <Dashboard />
    </main>
  );
}

export default App;
