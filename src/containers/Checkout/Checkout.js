import React,{Component} from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }

  componentWillMount() {
    //this is to show the burger content in the burger at checkout.
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price=0;
    for(let param of query.entries()) {
      //['salad','1']
      if(param[0] === 'price')
      {
          price=param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
      
    }

    this.setState({ingredients: ingredients, totalPrice: price});
  }
  
  clickedCancelHandler = () =>{
    this.props.history.goBack();
  }

  clickedContinueHandler = () =>{
    this.props.history.replace('/checkout/contact-data');
  }
  render()
  {
    return(
      <div>
          <CheckoutSummary 
          ingredients={this.state.ingredients}
          clickedContinue={this.clickedContinueHandler}
          clickedCancel={this.clickedCancelHandler}/>
          <Route path={this.props.match.path + '/contact-data'} 
          render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
      </div>
    );
  }
}

export default Checkout;