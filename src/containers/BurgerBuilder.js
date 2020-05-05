import React,{Component} from 'react';
import Aux from '../hoc/Aux/Aux'
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axios from '../axios-orders';
import Spinner from '../components/UI/Spinner/Spinner';
import WithErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

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
    ingredients: null,
    burgerPrice: 4,
    purchaseAble: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://react-my-burger-af029.firebaseio.com/ingridients.json')
      .then(response =>{
        this.setState({ingredients: response.data})
    })
    .catch(error =>{
      this.setState({error: true})
    });
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

  purchaseCancelHandler = ()=>{
    this.setState({purchasing:false});
  }

  purchaseContinueHandler= ()=> {
    //alert('You continue');
    const queryParams = []
    for(let i in this.state.ingredients)
    {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.burgerPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
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
  let orderSummary = null;

  let burger = this.state.error?<p>The ingriendts cant load</p> : <Spinner />;
  if(this.state.ingredients)
  {
    burger =(
      <Aux>
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
  orderSummary = <OrderSummary 
  ingridients={this.state.ingredients} 
  price={this.state.burgerPrice}
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

export default WithErrorHandler(BurgerBuilder,axios); 