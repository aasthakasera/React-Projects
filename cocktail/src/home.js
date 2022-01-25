import React from "react";

import SearchBar from "./searchBar.js";
import CocktailList from "./cocktailList.js";

const Home = () => {
  return (
      <main>
        <SearchBar />
        <CocktailList />
      </main>
  );
};

export default Home;
