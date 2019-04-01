import React from 'react';

export class Camera extends React.Component {
  cameraRefresh = () => {
    this.forceUpdate();
    setInterval(this.cameraRefresh, 30*1000);
  }
  componentDidMount(){
    this.cameraRefresh();
  }
  render(){
    return(<div className="camera">
      <img
      src="http://143.107.235.2:8000/sensors/media"
      width="100%"
      height="100%"
      alt="camera feed"
      />
    </div>
    )
  }
}
