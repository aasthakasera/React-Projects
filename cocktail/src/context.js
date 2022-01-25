import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState('');
  const [cocktails, setCocktails] = useState([]);

  const fetchCocktail = useCallback(async() => {
    setLoading(true)
    try {
        const response = await fetch(`${url}${searchVal}`)
        const data = await response.json();
        console.log(data);
        const { drinks }= data;
        //data.drinks;
        console.log(drinks);
        setLoading(false);
        if(drinks) {
            const newCocktail = drinks.map((cock) => {
                const {
                    idDrink,
                    strDrink,
                    strDrinkThumb,
                    strAlcoholic,
                    strGlass,
                  } = cock
        
                  return {
                    id: idDrink,
                    name: strDrink,
                    image: strDrinkThumb,
                    info: strAlcoholic,
                    glass: strGlass,
                  }
            })
            setCocktails(newCocktail);
        } else {
            setCocktails([])
            setLoading(false);
        }

    } catch(error) {
        console.log(error)
        setLoading(false);
    }
  },[searchVal])

  useEffect(() => {
    fetchCocktail()
  },[searchVal, fetchCocktail])

  return <AppContext.Provider value={{
      loading, searchVal, cocktails,setSearchVal,

  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }