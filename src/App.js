import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Register, Dashboard, Error } from "./pages";
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    <ToastContainer position="top-center"/>
    </BrowserRouter>
  );
}

export default App;
