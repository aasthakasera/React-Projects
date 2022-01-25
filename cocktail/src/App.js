import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home.js";
import About from "./about.js";
import Error from "./error.js";
import SpecificCocktail from "./specificCocktail.js";
// navbar
import Navbar from "./navbar.js";
import './App.css';

function App() {
  return (
    <div className="container">
      <BrowserRouter className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cocktail/:id" element={<SpecificCocktail />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
