import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
  const ingridentSummary = Object.keys(props.ingridients)
    .map(igKey => {
      return(
      <li key={igKey}><span>{igKey} : {props.ingridients[igKey]}</span></li>
      );
    });

    return(
        <Aux >
          <h3>Your Order</h3>
          <p>Your delecious Burger has: </p>
          <ul>
            {ingridentSummary}
          </ul>
          <p>Continue to Checkout!</p>
        </Aux>
    );
}

export default orderSummary;
