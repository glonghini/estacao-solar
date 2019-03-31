import React from 'react';
import logoimg from '../images/lab_ocular.png';

export const Header = () => {
  return (
    <div className='logo'>
      <a href="http://www.sel.eesc.usp.br/lio/" target="_blank" rel="noopener noreferrer">
        <img src={logoimg} width="13%" height="14%" alt="LIO logo"/>
      </a>
    </div>
  );
}
