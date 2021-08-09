import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Ingredient from './pages/Ingredient';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/recipes" component={Recipes} />
      <Route path="/recipes/:id" component={Recipes} />
      <Route exact path="/ingredient" component={Ingredient}/>
      <Route path="/ingredient/:ingredient" component={Ingredient}/>
      <Redirect to="/"/>
    </Switch>
  );
};

export default App;