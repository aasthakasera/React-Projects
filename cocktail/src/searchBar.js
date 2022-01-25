import {React, useRef} from "react";
import { useGlobalContext } from "./context";

const SearchBar = () => {
    const {setSearchVal} = useGlobalContext();
    const searchVal = useRef('');

    const searchCocktail = () => {
        setSearchVal(searchVal.current.value);
    }

    return(
        <section className="section-search">
            <form className='search-form'>
                <div className='form-control'>
                    <label htmlFor='name'>Search</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        ref={searchVal}
                        onChange={searchCocktail}
                    />
                </div>
            </form>
        </section>
    )
}

export default SearchBar;

