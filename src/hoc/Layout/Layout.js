import React,{Component}from 'react'
import Aux from '../Aux/Aux'
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

  state= {
    showSideDrawer: false
  }

  changeShowSideHandler = ()  => {
    this.setState({showSideDrawer: false});
  }

  changeDrawToggleclicked = () => {
    //do this when you are dependent on the previous state value.
    this.setState((prevState) =>{
      return{showSideDrawer: !prevState.showSideDrawer}
    })
  }

  render(){
    return(
      <Aux>
      <Toolbar DrawToggleclicked={this.changeDrawToggleclicked}/>
      <SideDrawer closed={this.changeShowSideHandler} open={this.state.showSideDrawer}/>
      <main className={classes.Content}>
        {this.props.children}
      </main>
      </Aux>
    );
  }
  
}

export default Layout;