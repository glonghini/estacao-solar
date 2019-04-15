import React from 'react';

export const SunriseSunset = (props) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th><img src='../../images/sunrise.png' width="45%" alt="sunrise icon"/></th>
            <th><img src='../../images/sunset.png' width="45%" alt="sunset icon"/></th>
            <th>Duração do dia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.nascerDoSol}</td>
            <td>{props.porDoSol}</td>
            <td>{props.duracaoDoDia}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
