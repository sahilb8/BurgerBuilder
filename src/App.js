import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from '../src/containers/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom';

function App() {
  return (
    <div>
        <Layout>
          <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/" exact component={BurgerBuilder}/>
          
          </Switch>
        </Layout>
    </div>
  );
}

export default App;
