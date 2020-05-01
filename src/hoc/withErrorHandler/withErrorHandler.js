import React,{Component} from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent,axios) => {
  return class extends Component {
    state = {
      error: null
    }

    
      componentDidMount() {
          this.reqInterceptor = axios.interceptors.request.use(req => {
            this.setState({error: null});
            return req;
          });
          this.resInterceptor = axios.interceptors.response.use(res => res, error =>{
            this.setState({error: error})
          });
      }

      componentWillUnmount() {
        //this is required to clean up or remove the interceptirs when the burgerBuilder is not requored and will work at the clean up of the component. this is very essential as it dosent waste memory 
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);

      }

      errorConfirmedHandler=()=>{
        this.setState({error:null})
      }
      render()
      {
      return(
        <Aux>
          <Modal 
          modalCLosed={this.errorConfirmedHandler}
          show={this.state.error}>
          {this.state.error ? this.state.error.message : null}
          </Modal>
        <WrappedComponent {...this.props}/>
        </Aux>
      );
    }
  }
}

export default withErrorHandler;

//this component acts as a global error handling component