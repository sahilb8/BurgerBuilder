import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';


class ContactData extends Component {

  state = {
    orderForm:{
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        street:{
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Street'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        state: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your State'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        zip: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your PostalCode'
          },
          value: '',
          validation: {
            required: true,
            minLength: 5,
            maxLength: 5
          },
          valid: false,
          touched: false
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Country'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Email'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        orderMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value:'fastest', displayValue: 'Fastest'},
              {value:'cheapest', displayValue:'Cheapest'}
            ]
          },
          value: 'fastest',
          validation: {},
          valid: true
        }
    },
    formIsValid: false,
    loading: false
  }



  orderHandler = (event) =>{
    event.preventDefault();
        this.setState({loading: true})
        const formData = {}
        for(let formElementIdentifier in this.state.orderForm)
        {
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
    const order = {
      ingridents: this.props.igr,
      price: this.props.price,
      orderData: formData
    };

    axios.post('/orders.json',order)
      .then(response => {
        this.setState({loading: false})
      this.props.history.push('/');
    })
      .catch(error => this.setState({loading: false}));
    
  }

  checkValidity(value,rules)
  {
    let isValid = true;

    if(rules.required)
    {
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength)
    {
      isValid= value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength)
    {
      isValid= value.length <= rules.maxLength && isValid;
    }

  return isValid;
  }

  changeEventHandler = (event, inputFormIdentifier) =>{
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    //the above spread wont spread the object deeply
    const updatedFormElement = {
      ...updatedOrderForm[inputFormIdentifier]
    }
    updatedFormElement.value=event.target.value;
    //this is to check the validation
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
    //in here we know something has been changed
    updatedFormElement.touched= true;
    updatedOrderForm[inputFormIdentifier] = updatedFormElement;
    
    let formIsValid = true;
    for(let inputFormIdentifier in updatedOrderForm)
    {
      formIsValid = updatedOrderForm[inputFormIdentifier].valid && formIsValid;
    }

    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  render(){

    const fromElementArray = [];
    for(let key in this.state.orderForm)
    {
      fromElementArray.push(
        {id: key,
        config: this.state.orderForm[key]}
      )
    }
    let form=(<form>
      {fromElementArray.map(formEle => (
        <Input 
        key={formEle.id}
        elementType={formEle.config.elementType}
        elementConfig={formEle.config.elementConfig}
        value={formEle.config.value}
        invalid={!formEle.config.valid}
        shouldValidate={formEle.config.validation}
        touched={formEle.config.touched}
        changed={(event)=>this.changeEventHandler(event,formEle.id)}/>
      ))}
      <Button 
      btnType="Success" 
      clicked={this.orderHandler}
      disabled={!this.state.formIsValid}>ORDER</Button>
    </form>);
      if(this.state.loading)
      {
        form=<Spinner />
      }
    return(
      <div className={classes.ContactData}>
        <h4>Enter your contact details</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    igr: state.ingredients,
    price: state.burgerPrice
  }
}

export default connect(mapStateToProps)(ContactData);