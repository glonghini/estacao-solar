import React from 'react';
import {Line} from 'react-chartjs-2';

export const ChartComponent = (props) => {
  return(
    <div className="chart">
      <Line
        data={props.chartData}
        options={props.chartData.options}
      />
    </div>
  )
}
