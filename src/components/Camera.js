import React from 'react';
import axios from 'axios';

export class Camera extends React.Component {
  state = {
    cameraLink: ""
  }
  cameraRefresh = () => {
    this.setState({
      cameraLink: '',
      cameraLink: "http://143.107.235.2:8000/sensors/media/"
    });
    this.forceUpdate();
    setTimeout(this.cameraRefresh, 30*1000);
  }
  componentDidMount(){
    axios.get("http://143.107.235.2:8000/sensors/media/")
      .then(response => {
        this.setState(
          {
          cameraLink: response.data
          }
        )
        console.log(response.data);
      }
    );
  }
  render(){
    return(
      <div className='camera-image'>
        <img
        src={this.state.cameraLink}
        width="100%"
        height="100%"
        alt="camera feed"
        />
      </div>
    )
  }
}
