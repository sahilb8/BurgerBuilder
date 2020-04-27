import React from 'react';
import Image from '../../assets/Images/logo.png';
//we have to tell webpack to use this image , else if u directly specify the path in image tag then it wont work.
import classes from './Logo.css';

const logo = (props) =>{
  return (
    <div className={classes.Logo}>
      <img src={Image} alt="MyBurger"/>
    </div>
  );
}

export default logo;