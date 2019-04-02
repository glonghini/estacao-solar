import React from 'react';

export class UVIndex extends React.Component {
  render(){
    if (this.props.uv_sel <= 1){
      return(<div className='box-uv uv-index-1'>
          <span>{this.props.uv_sel}</span>
          <h5>Baixo</h5>
        </div>
      );
    }
    if (this.props.uv_sel === 2){
      return(<div className='box-uv uv-index-2'>
          <span>{this.props.uv_sel}</span>
          <h5><span>Baixo</span></h5>
        </div>
      );
    }
    if (this.props.uv_sel === 3){
      return(<div className='box-uv uv-index-3'>
          <span>{this.props.uv_sel}</span>
          <h5><span>Médio</span></h5>
        </div>
      );
    }
    if (this.props.uv_sel === 4){
      return(<div className='box-uv uv-index-4'>
          <span>{this.props.uv_sel}</span>
          <h5><span>Médio</span></h5>
        </div>
      );
    }
    if (this.props.uv_sel === 5){
      return(<div className='box-uv uv-index-5'>
          <div className="uv-index-number">{this.props.uv_sel}</div>
          <div className="uv-index-level">Médio</div>
        </div>
      );
    }
    if (this.props.uv_sel === 6){
      return(<div className='box-uv uv-index-6'>
          <span>{this.props.uv_sel}</span>
          <h5><span>Alto</span></h5>
        </div>
      );
    }
    if (this.props.uv_sel === 7){
      return(<div className='box-uv uv-index-7'>
          <span>{this.props.uv_sel}</span>
          <h5><span>Alto</span></h5>
        </div>
      );
    }
    if (this.props.uv_sel === 8){
      return(<div className='box-uv uv-index-8'>
          <span>{this.props.uv_sel}</span>
          <h5><span>Muito Alto</span></h5>
        </div>
      );
    }
    if (this.props.uv_sel === 9){
      return(<div className='box-uv uv-index-9'>
          <span>{this.props.uv_sel}</span>
          <h5><span>Muito Alto</span></h5>
        </div>
      );
    }
    if (this.props.uv_sel === 10){
      return(<div className='box-uv uv-index-10'>
          <span>{this.props.uv_sel}</span>
          <h5><span>Muito Alto</span></h5>
        </div>
      );
    }
    if (this.props.uv_sel >= 11){
      return(<div className='box-uv uv-index-11'>
          <span>{this.props.uv_sel}</span>
          <h5><span>Extremo</span></h5>
        </div>
      );
    }
  }
}
