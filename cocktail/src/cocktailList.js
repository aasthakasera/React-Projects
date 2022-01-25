import {React} from "react";
import Loading from "./loading";
import { useGlobalContext } from "./context";
import Cocktail from "./cocktail";

const CocktailList = () => {
    const {cocktails, loading} = useGlobalContext();
    console.log(cocktails)
    if(loading) {
        return (
            <Loading/>
        )
    }
    if(cocktails.length == 0) {
        return <p>Oops! try something else</p>
    }
    return(
        <section className="section">
            <h3>Cocktail List</h3>
            <div className="cocktail-center">
                {
                    cocktails.map((cock) => {
                      return (
                          <Cocktail
                            key = {cock.id}
                            {...cock}
                          />
                      )
                    })
                }
            </div>
        </section>
    )
}

export default CocktailList;