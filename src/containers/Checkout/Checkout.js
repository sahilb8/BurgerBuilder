import React,{Component} from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';

class Checkout extends Component {
  
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
          ingredients={this.props.igr}
          clickedContinue={this.clickedContinueHandler}
          clickedCancel={this.clickedCancelHandler}/>
          <Route path={this.props.match.path + '/contact-data'} 
          component={ContactData}/>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    igr: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);