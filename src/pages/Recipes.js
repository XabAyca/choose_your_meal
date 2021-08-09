import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Job = () => {
  const [recipe, setRecipe] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=`+ id)
    .then((response) => response.json())
    .then((response) => setRecipe(response.meals[0]))
  }, [id])
  
  useEffect(() => {
    let temp =[]
    for (const [keyEl, value] of Object.entries(recipe)) {
      if (keyEl.includes('strIngredient')) {
        if (value !== '' && value !== null) {
          temp.push(value)
        }
      }
    }
    setIngredients(temp)
  },[recipe])

  return (
    <div>
      <NavBar/>
      <h1>Recipe for {recipe.strMeal}</h1>
      <div>
        <h2>Instructions</h2>
        <p>{recipe.strInstructions}</p>
      </div>
      <div>
        <h2>Ingredients</h2>
        {ingredients && ingredients.map((ingredient) => {
          return <NavLink className="ingredient" to={"/ingredient/"+ingredient.split(' ').join('_')}>{ingredient}</NavLink>
        })}
      </div>
    </div>
  );
};

export default Job;