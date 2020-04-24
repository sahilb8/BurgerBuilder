import React from 'react';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import classes from './Burger.css';

const burger = (props) => {

  //object.keys extracts the keys of the given object and converts them into an array
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey =>{
      return [...Array(props.ingredients[igKey])].map((_,i) => {
        return <BurgerIngredients key={igKey+i} type={igKey}/>;
      });
    }).reduce((arr,el) => {
        return arr.concat(el);
    },[]);
    
    //reduce takes 2 argumnets the previous value and the current value  and also a initial value like an empty array.
    if(transformedIngredients.length === 0)
    {
      transformedIngredients = <p>Start adding to your Burger</p>
    }
    return(
      <div className={classes.Burger}>
        <BurgerIngredients type="bread-top" />
        {transformedIngredients}
        <BurgerIngredients type="bread-bottom" />
      </div>
    );
}

export default burger;