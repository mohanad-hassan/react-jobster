import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Register, Error } from "./pages";
import  {Profile,Stats,AddJob,AllJobs,SharedLayout} from './pages/dashboard/'
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<SharedLayout />} >
            <Route path="/Profile" element={<Profile/>}/>
            <Route path="/Stats" element={<Stats/>}/>
            <Route path="/AddJob" element={<AddJob/>}/>
            <Route path="/AllJobs" element={<AllJobs/>}/>
          </Route>
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
