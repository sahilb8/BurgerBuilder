import React from 'react';
import classes from './Order.css'

const order = (props) =>{
  const ingridients = [];
  for(let ingridientName in props.ingredients)
  {
    ingridients.push({
      name: ingridientName,
      amount:props.ingredients[ingridientName]
    })
  }

  const ingridientOutput = ingridients.map(ig =>{
    return <span 
    style = {{
      textTransform: 'capitalize',
      display: 'inline-block',
      margin: '0 8px',
      border: '1px solid #ccc',
      padding: '5px'
    }}
    key={ig.name}>{ig.name} ({ig.amount})</span>
  })
  return(
    <div className={classes.Order}>
      <p>Ingridients: {ingridientOutput} </p>
      <p>Price: {props.price.toFixed(2)}</p>
    </div>
  );

}

export default order;