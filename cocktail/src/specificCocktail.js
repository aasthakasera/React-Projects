import {React} from "react";
import Loading from './loading'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from "react/cjs/react.development";

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SpecificCocktail = () => {
    const param = useParams()
    const {id} = useParams()
    console.log(param);
    const [loading, setLoading] = useState(true);
    const [cocktail, setCocktail] = useState();

    const fetchCocktailData = async() => {
        setLoading(true);
        try {
            const response = await fetch(`${url}${id}`);
            console.log('response : ', response);
            const data = await response.json();
            console.log(data);
            const {drinks} = data;
            if (drinks) {
                const {
                  strDrink: name,
                  strDrinkThumb: image,
                  strAlcoholic: info,
                  strCategory: category,
                  strGlass: glass,
                  strInstructions: instructions,
                  strIngredient1,
                  strIngredient2,
                  strIngredient3,
                  strIngredient4,
                  strIngredient5,
                } = drinks[0]
                const ingredients = [
                  strIngredient1,
                  strIngredient2,
                  strIngredient3,
                  strIngredient4,
                  strIngredient5,
                ]
                const newCocktail = {
                  name,
                  image,
                  info,
                  category,
                  glass,
                  instructions,
                  ingredients,
                }
                setCocktail(newCocktail)
            } else {
                setCocktail(null);
            }
        } 
        catch(error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchCocktailData()
    },[id])

    if (loading) {
        return <Loading/>
    }

    return(
        <div>
            <Link to='/' className='btn btn-primary'>
                back home
            </Link>
            <div>
                <p>{id}</p>
            </div>
        </div>
    )
}
export default SpecificCocktail;

