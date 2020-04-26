import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Bacon', Type:'bacon'},
  {label: 'Salad', Type:'salad'},
  {label: 'Cheese', Type:'cheese'},
  {label: 'Meat', Type:'meat'}
]

const buildControl = (props) => {
  return(
  <div className={classes.BuildControls}>
    <p><strong>The Burger Price is: {props.price}</strong></p>
    {controls.map(ctrl => {
      return(
        <BuildControl Label={ctrl.label} 
        key={ctrl.label} 
        added={() => props.ingredientAdd(ctrl.Type)}
        removed={() =>props.ingredientRemove(ctrl.Type)}
        disable={props.disabled[ctrl.Type]}/>
      );
    })}
    <button 
    disabled={props.purchasable} 
    className={classes.OrderButton}
    onClick={props.ordered}>ORDER NOW</button>
  </div>
  );
};

export default buildControl;