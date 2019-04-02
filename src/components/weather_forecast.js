import React from 'react';

export const WeatherForecastComponent = (props) => {
    return (<div>
    <div className="weather-one">
      <h3>{props.cidade}, {props.data}</h3>
    </div>
    <div className="weather-two">
      <table>
        <tbody>
          <tr>
            <td><img src={props.iconManha} alt="morning weather forecast"/></td>
            <td><img src={props.iconTarde} alt="afternoon weather forecast"/></td>
            <td><img src={props.iconNoite} alt="night weather forecast"/></td>
          </tr>
          <tr>
            <td><h3>Manhã</h3></td>
            <td><h3>Tarde</h3></td>
            <td><h3>Noite</h3></td>
          </tr>
        </tbody>
      </table>
      <h3>{props.frase}</h3>
    </div>
    <div className="weather-three">
      <table align="center">
        <thead>
          <tr>
            <th><img src="../images/rain.png" alt="rain icon"/></th>
            <th><img src="../images/humidity.png" alt="humidity icon"/></th>
            <th><img src="../images/thermometer.png" alt="thermometer icon"/></th>
            <th><img src="../images/wind.png" alt="wind icon"/></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan="2">{props.probabilidadeChuva}% {props.precipitacaoChuva}mm</td>
            <td>{props.umidadeMax}%</td>
            <td>{props.temperaturaMax}°C</td>
            <td>{props.ventoMax} km/h</td>
          </tr>
          <tr>
            <td>{props.umidadeMin}%</td>
            <td>{props.temperaturaMin}°C</td>
            <td>{props.ventoMin} km/h</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  );
}
