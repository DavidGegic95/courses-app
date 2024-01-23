import React from 'react';
import './logo.css';

const Logo = () => {
  return (
    <img
      className='logo_img'
      src={require('../../../../assets/courses_logo.webp')}
      alt='courses logo'
    />
  );
};

export default Logo;
