import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Home = () => {
  const [lastSearch, setLastSearch] = useState(JSON.parse(localStorage.el)||[])
  const [recipes, setRecipes] = useState(undefined);
  const [search, setSearch] = useState("");
  const [suggest, setSuggest] = useState("")
  let history = useHistory();

  useEffect(() => {
    localStorage.setItem("el", JSON.stringify(lastSearch))
  }, [lastSearch])

  useEffect(() => {
    fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=`+search)
    .then((response) => response.json())
    .then((response)=> setRecipes(response.meals))
  }, [search])

  const onChangeHandler = (e) => {
    setSearch(e)
    if (search.length >= 2 && recipes) {
      let temp = recipes.splice(0,10)
      setSuggest(temp)
    }
  }

  const onSuggestHandler = (e) => {
    setSearch(e)
    setSuggest("")
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLastSearch([recipes[0], ...lastSearch]);
    setTimeout(() => {
      history.push("/recipes/"+recipes[0].idMeal)
    },10)
    
  }
  
  return (
    <div>
      <NavBar/>
      <h1>Home</h1>
      <form onSubmit={onSubmitHandler}>
        <input type="text" value={search} onChange={(e) => onChangeHandler(e.target.value)}></input>
        <input type="submit" value="Rechercher"></input>
      </form>
      <div className="suggest-list">
        {suggest && <small>Suggestions</small>}
        {suggest && suggest.map((recipe) => {
          return <div className="suggest" key={recipe.idMeal} onClick={()=>onSuggestHandler(recipe.strMeal)}>{recipe.strMeal}</div>
        })}
      </div>
      <div>
        {lastSearch && <small>Dernières recherches</small>}
        {lastSearch && lastSearch.map((el) => {
          return <div className="suggest" onClick={() => onSuggestHandler(el.strMeal)}>{el.strMeal}</div>
        })}
      </div>
    </div>
  );
};

export default Home;