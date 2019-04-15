import React from 'react';

export const TempHumi = (props) => {
  return (
    <div>
 	    <table>
        <thead>
          <tr>
       		  <td></td>
       		  <th>Estação</th>
       		  <th>Climatempo</th>
       	  </tr>
        </thead>
        <tbody>
       	  <tr>
       		  <th><img src="../images/thermometer.png" alt="thermometer icon"/></th>
       		  <td>{props.temperaturaSEL}</td>
       		  <td>{props.temperaturaClimatempo}</td>
       	  </tr>
       	  <tr>
       		  <th><img src="../images/humidity.png" alt="humidity icon"/></th>
       		  <td>{props.umidadeSEL}</td>
       		  <td>{props.umidadeClimatempo}</td>
       	  </tr>
          <tr>
       		  <th><img src="../images/rain.png" alt="rain icon"/></th>
       		  <td>{props.chuvaSEL}</td>
       		  <td></td>
       	  </tr>
        </tbody>
   	  </table>
    </div>
  );
}
