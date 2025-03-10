import "./css/App.css";
import Home from "../src/pages/home";
import { Routes, Route } from "react-router-dom";
import Favourites from "./pages/favorites";
import NavBar from "./components/NavBar";
function App() {
  return (
    <>
      <div>
        <div>
          <NavBar></NavBar>
        </div>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/favourites" element={<Favourites />}></Route>
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
