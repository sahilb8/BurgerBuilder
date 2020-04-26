import React,{Component} from 'react';
import Aux from '../hoc/Aux';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  'bacon': 0.4,
  'salad': 2,
  'cheese':0.8,
  'meat': 3
}

class BurgerBuilder extends Component{
  // constructor(props)
  // {
  //   super(props)
  //   this.state={...}
  // }

  state = {
    ingredients:{
    bacon: 0,
    salad: 0,
    cheese: 0,
    meat: 0
    },
    burgerPrice: 4,
    purchaseAble: false,
    purchasing: false
  }

  updateBurgerPurchaseable(ingridents) {

    const sum = Object.keys(ingridents)
      .map(igKey => {
        return ingridents[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      },0);

      this.setState({purchaseAble: sum>0});
  }

  addBurgerIngredients = (type)=>{
      const oldCount = this.state.ingredients[type];
      const newCount = oldCount +1;

      const updatedIngredients = {
        ...this.state.ingredients
      };

      updatedIngredients[type] = newCount;

      const updatedPrice = this.state.burgerPrice + INGREDIENT_PRICES[type];

      this.setState({
        ingredients: updatedIngredients,
        burgerPrice: updatedPrice
      });

      this.updateBurgerPurchaseable(updatedIngredients);
  }

  removeBurgerIngredients = (type) =>{
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount - 1;
    if(oldCount<=0)
      return
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = newCount;

    const updatedPrice = this.state.burgerPrice - INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      burgerPrice: updatedPrice
    });

    this.updateBurgerPurchaseable(updatedIngredients);
  }

  changePurchasing = ()=>{
    this.setState({purchasing: true});
  }

  modalCancelHandler = ()=>{
    this.setState({purchasing:false});
  }

  render(){
    const disabledInfo = {
      ...this.state.ingredients
    };

    for(let key in disabledInfo)
    {
      disabledInfo[key] = disabledInfo[key]<=0;
    }
  // { 'salad':true,'bacon':false...}
    return(
      <Aux>
        <Modal show={this.state.purchasing} modalCLosed={this.modalCancelHandler}>
          <OrderSummary ingridients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
        ingredientAdd={this.addBurgerIngredients}
        ingredientRemove={this.removeBurgerIngredients}
        disabled={disabledInfo}
        price={this.state.burgerPrice.toFixed(2)}
        ordered={this.changePurchasing}
        purchasable={!this.state.purchaseAble}/>

      </Aux>
    );
  }

}

export default BurgerBuilder;