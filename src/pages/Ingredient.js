import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Skill = () => {
  const { ingredient } = useParams()
  const [recipes, setRecipes] = useState("")
  let history = useHistory();

  useEffect(() => {
    fetch("http://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient)
    .then(response => response.json())
    .then(response => setRecipes(response.meals))
  }, [ingredient])
  
  const onSubmitHandler = (el) => {
    history.push("/recipes/"+el)
  }

  return (
    <div>
      <NavBar/>
      <h1>With the {ingredient.split("_").join(' ')}, you can cook :</h1>
      <div className="recipes-list">
        {recipes && recipes.map((recipe) => {
          return (
            <div className='recipe-card' onClick={()=> onSubmitHandler(recipe.idMeal)}>
              <h1>{recipe.strMeal}</h1>
              <div className="recipe-img-container">
                <img className='recipe-img' src={recipe.strMealThumb} alt="recipe" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Skill;