import { ToastContainer } from "react-toastify";
import { Dashboard } from "./pages";

function App() {

  const toastProps = {
    position: "top-center",
    autoClose: 1000,
  };

  return (
    <>
     {/* <ToastContainer {...toastProps} /> */}
    <main className="md:p-8 px-4 py-6 bg-[#3b3b3b] md:h-[100vh] w-[100%]">
     
      <Dashboard />
    </main>
    </>
    
  );
}

export default App;
