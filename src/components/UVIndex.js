import React from 'react';

export const UVIndex = (props) => {
  if (props.uvSEL <= 1){
    return(
      <div>
        <div className='box-uv uv-index-1'>
          <div className="uv-index-number">{props.uvSEL}</div>
          <div className="uv-index-level">Baixo</div>
        </div>
      </div>
    );
  }
  if (props.uvSEL === 2){
    return(
      <div>
        <div className='box-uv uv-index-2'>
          <div className="uv-index-number">{props.uvSEL}</div>
          <div className="uv-index-level">Baixo</div>
        </div>
      </div>
    );
  }
  if (props.uvSEL === 3){
    return(
      <div>
        <div className='box-uv uv-index-3'>
          <div className="uv-index-number">{props.uvSEL}</div>
          <div className="uv-index-level">Médio</div>
        </div>
      </div>
    );
  }
  if (props.uvSEL === 4){
    return(
      <div>
        <div className='box-uv uv-index-4'>
          <div className="uv-index-number">{props.uvSEL}</div>
          <div className="uv-index-level">Médio</div>
        </div>
      </div>
    );
  }
  if (props.uvSEL === 5){
    return(
      <div>
        <div className='box-uv uv-index-5'>
          <div className="uv-index-number">{props.uvSEL}</div>
          <div className="uv-index-level">Médio</div>
        </div>
      </div>
    );
  }
  if (props.uvSEL === 6){
    return(
      <div>
        <div className='box-uv uv-index-6'>
          <div className="uv-index-number">{props.uvSEL}</div>
          <div className="uv-index-level">Alto</div>
        </div>
      </div>
    );
  }
  if (props.uvSEL === 7){
    return(
      <div>
        <div className='box-uv uv-index-7'>
          <div className="uv-index-number">{props.uvSEL}</div>
          <div className="uv-index-level">Alto</div>
        </div>
      </div>
    );
  }
  if (props.uvSEL === 8){
    return(
      <div>
        <div className='box-uv uv-index-8'>
          <div className="uv-index-number">{props.uvSEL}</div>
          <div className="uv-index-level">Muito Alto</div>
        </div>
      </div>
    );
  }
  if (props.uvSEL === 9){
    return(
      <div>
        <div className='box-uv uv-index-9'>
          <div className="uv-index-number">{props.uvSEL}</div>
          <div className="uv-index-level">Muito Alto</div>
        </div>
      </div>
    );
  }
  if (props.uvSEL === 10){
    return(
      <div>
        <div className='box-uv uv-index-10'>
          <div className="uv-index-number">{props.uvSEL}</div>
          <div className="uv-index-level">Muito Alto</div>
        </div>
      </div>
    );
  }
  if (props.uvSEL >= 11){
    return(
      <div>
        <div className='box-uv uv-index-11'>
          <div className="uv-index-number">{props.uvSEL}</div>
          <div className="uv-index-level">Extremo</div>
        </div>
      </div>
    );
  }
  return null;
}
