import React from 'react';

export class Camera extends React.Component {
  state = {
    cameraLink: ""
  }
  cameraRefresh = () => {
    this.setState({
      cameraLink: "http://143.107.235.2:8010/mjpeg/stream.cgi?chn=0?login=admin&password=1234567"
    });
    setInterval(this.cameraRefresh, 30*1000);
  }
  componentDidMount(){
    this.cameraRefresh();
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
