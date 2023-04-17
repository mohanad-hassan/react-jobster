import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Register, Error } from "./pages";
import {
  Profile,
  Stats,
  AddJob,
  AllJobs,
  SharedLayout,
} from "./pages/dashboard/";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./pages/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Stats />} />
            <Route path="/add-job" element={<AddJob />} />
            <Route path="/all-jobs" element={<AllJobs />} />
          </Route>
          <Route path="/landing" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
