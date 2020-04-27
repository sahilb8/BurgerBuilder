import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

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
          <p><strong>The price is: {props.price.toFixed(2)}</strong></p>
          <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
          <Button btnType="Danger" clicked={props.purchaseCancel}>Cancel</Button>
        </Aux>
    );
}

export default orderSummary;
