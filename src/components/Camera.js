import React from 'react';
import axios from 'axios';

export class Camera extends React.Component {
  state = {
    cameraLink: 'http://143.107.235.2:8000/sensors/media/',
    imageHash: Date.now()
  }
  cameraRefresh = () => {
    this.setState({
      imageHash: Date.now()
    });
    setTimeout(this.cameraRefresh, 30*1000);
  }
  componentDidMount(){
    this.cameraRefresh();
  }
  render(){
    return(
      <div className='camera-image'>
        <img
        src={`${this.state.cameraLink}?${this.state.imageHash}`}
        width="100%"
        height="100%"
        alt="camera feed"
        />
      </div>
    )
  }
}
