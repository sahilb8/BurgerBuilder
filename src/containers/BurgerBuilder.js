import React,{Component} from 'react';
import Aux from '../hoc/Aux/Aux'
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axios from '../axios-orders';
import Spinner from '../components/UI/Spinner/Spinner';
import WithErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../store/actions';
import {connect} from 'react-redux';



class BurgerBuilder extends Component{
  // constructor(props)
  // {
  //   super(props)
  //   this.state={...}
  // }

  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // axios.get('https://react-my-burger-af029.firebaseio.com/ingridients.json')
    //   .then(response =>{
    //     this.setState({ingredients: response.data})
    // })
    // .catch(error =>{
    //   this.setState({error: true})
    // });
  }

  updateBurgerPurchaseable(ingridents) {

    const sum = Object.keys(ingridents)
      .map(igKey => {
        return ingridents[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      },0);

      return sum>0 ;
  }


  changePurchasing = ()=>{
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = ()=>{
    this.setState({purchasing:false});
  }

  purchaseContinueHandler= ()=> {
    //alert('You continue');
    this.props.history.push("/checkout");
  }

  render(){
    const disabledInfo = {
      ...this.props.igr
    };

    for(let key in disabledInfo)
    {
      disabledInfo[key] = disabledInfo[key]<=0;
    }
  // { 'salad':true,'bacon':false...}
  let orderSummary = null;

  let burger = this.state.error?<p>The ingriendts cant load</p> : <Spinner />;
  if(this.props.igr)
  {
    burger =(
      <Aux>
      <Burger ingredients={this.props.igr}/>
          <BuildControls 
          ingredientAdd={this.props.onAddIngridient}
          ingredientRemove={this.props.onRemoveIngridient}
          disabled={disabledInfo}
          price={this.props.price.toFixed(2)}
          ordered={this.changePurchasing}
          purchasable={!this.updateBurgerPurchaseable(this.props.igr)}/>
      </Aux>
    );
  orderSummary = <OrderSummary 
  ingridients={this.props.igr} 
  price={this.props.price}
  purchaseCancel={this.purchaseCancelHandler}
  purchaseContinue={this.purchaseContinueHandler}/>
  }
  
  if(this.state.loading)
  {
    orderSummary = <Spinner />
  }
    return(
      <Aux>
        {/* The wrapping component decides the update of the wrapped component */}
        <Modal show={this.state.purchasing} modalCLosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }

}

const mapPropsToState = state =>{
  return {
    igr: state.ingredients,
    price: state.burgerPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngridient: (igName) => dispatch({type: actionTypes.ADD_INGRIDIENT, ingredientName: igName}),
    onRemoveIngridient: (igName) => dispatch({type: actionTypes.REMOVE_INGRIDIENT, ingredientName: igName})
  };
};

export default connect(mapPropsToState,mapDispatchToProps)(WithErrorHandler(BurgerBuilder,axios)); 