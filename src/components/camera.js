import React from 'react';

export class Camera extends React.Component {
  state = {
    cameraLink: "http://143.107.235.2:8000/sensors/media"
  }
  cameraRefresh = () => {
    this.setState({
      cameraLink: "http://143.107.235.2:8000/sensors/media"
    });
    setInterval(this.cameraRefresh, 30*1000);
  }
  componentDidMount(){
    this.cameraRefresh();
  }
  render(){
    return(
      <div className="camera">
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
