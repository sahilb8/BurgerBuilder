import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        bacon: 0,
        meat: 0,
        cheese: 0,
        salad: 0
    },
    burgerPrice: 4
}

const INGREDIENT_PRICES = {
    'bacon': 0.4,
    'salad': 2,
    'cheese':0.8,
    'meat': 3
  }

const reducer = (state=initialState,action) =>{
    switch(action.type)
    {
        case actionTypes.ADD_INGRIDIENT: 
        {
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                burgerPrice: state.burgerPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        }
        case actionTypes.REMOVE_INGRIDIENT:
            {
                return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                    },
                    burgerPrice: state.burgerPrice + INGREDIENT_PRICES[action.ingredientName]
                }
            }
        default: {
            return state;
        }
    }
}

export default reducer;