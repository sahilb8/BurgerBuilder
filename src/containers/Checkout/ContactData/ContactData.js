import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {

  state = {
    name: '',
    email: '',
    adress: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) =>{
    event.preventDefault();
        this.setState({loading: true})
    const order = {
      ingridents: this.props.ingredients,
      price: this.props.price,
      cutomer: {
        name: 'sahil',
        address:{
          street:'alto-porvorim',
          state: 'Goa',
          zip: 403521
        },
        email: 'sahiluifneiu@gmail.com'
      },
      orderMethod: 'fastest'
    };

    axios.post('/orders.json',order)
      .then(response => {
        this.setState({loading: false})
      this.props.history.push('/');
    })
      .catch(error => this.setState({loading: false}));
    
  }

  render(){
    let form=(<form>
      <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
      <input className={classes.Input} type="text" name="email" placeholder="Your Email" />
      <input className={classes.Input} type="text" name="street" placeholder="Your street" />
      <input className={classes.Input} type="text" name="postalCode" placeholder="Your Postal Code" />
      <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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

export default ContactData;