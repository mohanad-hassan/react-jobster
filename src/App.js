import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Register, Dashboard, Error } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>JOBSTER </h1>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
