import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import About from "./pages/About";
import Home from "./pages/Home";
import { Route, Routes} from "react-router-dom"
import Signin from "./pages/Signin";

function App() {
  return  ( 
  <>
    <Navbar />
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/signin" element={<Signin />}/>
      </Routes>
    </div>
  </>
  )
}

export default App;
