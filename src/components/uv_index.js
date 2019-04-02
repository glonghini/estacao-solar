import React from 'react';

export class UVIndex extends React.Component {
  render(){
    if (this.props.uv_sel <= 1){
      return(<div className='box-uv uv-index-1'>
          <div className="uv-index-number">{this.props.uv_sel}</div>
          <div className="uv-index-level">Baixo</div>
        </div>
      );
    }
    if (this.props.uv_sel === 2){
      return(<div className='box-uv uv-index-2'>
          <div className="uv-index-number">{this.props.uv_sel}</div>
          <div className="uv-index-level">Baixo</div>
        </div>
      );
    }
    if (this.props.uv_sel === 3){
      return(<div className='box-uv uv-index-3'>
          <div className="uv-index-number">{this.props.uv_sel}</div>
          <div className="uv-index-level">Médio</div>
        </div>
      );
    }
    if (this.props.uv_sel === 4){
      return(<div className='box-uv uv-index-4'>
          <div className="uv-index-number">{this.props.uv_sel}</div>
          <div className="uv-index-level">Médio</div>
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
          <div className="uv-index-number">{this.props.uv_sel}</div>
          <div className="uv-index-level">Alto</div>
        </div>
      );
    }
    if (this.props.uv_sel === 7){
      return(<div className='box-uv uv-index-7'>
          <div className="uv-index-number">{this.props.uv_sel}</div>
          <div className="uv-index-level">Alto</div>
        </div>
      );
    }
    if (this.props.uv_sel === 8){
      return(<div className='box-uv uv-index-8'>
          <div className="uv-index-number">{this.props.uv_sel}</div>
          <div className="uv-index-level">Muito Alto</div>
        </div>
      );
    }
    if (this.props.uv_sel === 9){
      return(<div className='box-uv uv-index-9'>
          <div className="uv-index-number">{this.props.uv_sel}</div>
          <div className="uv-index-level">Muito Alto</div>
        </div>
      );
    }
    if (this.props.uv_sel === 10){
      return(<div className='box-uv uv-index-10'>
          <div className="uv-index-number">{this.props.uv_sel}</div>
          <div className="uv-index-level">Muito Alto</div>
        </div>
      );
    }
    if (this.props.uv_sel >= 11){
      return(<div className='box-uv uv-index-11'>
          <div className="uv-index-number">{this.props.uv_sel}</div>
          <div className="uv-index-level">Extremo</div>
        </div>
      );
    }
  }
}
