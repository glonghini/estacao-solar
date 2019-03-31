import React from 'react';
import axios from 'axios';

export class Switch extends React.Component {
  state = {
    //estado dos botões
    isActive: true,
  }

  leftButtonClick = () => {
    this.state.isActive = true;
    this.forceUpdate();
  }

  rightButtonClick = () => {
    this.state.isActive = false;
    this.forceUpdate();
  }

  render() {
    return(<div>
      <input className={this.state.isActive ? 'button-checked' : 'button-unchecked'} value={this.props.leftValue} type="button" onClick={this.leftButtonClick} />
      <input className={this.state.isActive ? 'button-unchecked' : 'button-checked'} value={this.props.rightValue} type="button" onClick={this.rightButtonClick} />
    </div>
    )
  }
}
