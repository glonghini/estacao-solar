import React from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';

import {Gate} from "./gate.js";
import {Lens} from "./lens.js";

export class SunriseSunset extends React.Component {
  state = {
    //constantes da hora do nascer e por do sol
    nascer_do_sol: null,
    por_do_sol: null,
    duracao_do_dia: null
  }
  requestSunriseSunsetTime = () => {
    //utilizando o método get para pegar os dados da API do portão
    axios.get('http://143.107.235.2:8000/sensors/data/')
      .then(response => {
        console.log(response.data);
        this.setState(
          {
            nascer_do_sol: response.data.sensors[0].local.sunrise.slice(10,19),
            por_do_sol: response.data.sensors[0].local.sunset.slice(10,19),
            duracao_do_dia: response.data.sensors[0].local.time.slice(10,19)
          }
        );
        this.updateWidgets(response.data.sensors[0].open, this.checkDaytime(), response.data.sensors[0].rain, response.data.sensors[0].ExpositionTime);
      })
      .catch(error => {
        console.log('erro com o request do 143.107.235.2:8000');
        console.log(error);
      })
    setTimeout(this.requestSunriseSunsetTime, 30*1000);
  }
  checkDaytime = () => {
    const timeNow = new Date();
    //verificamos se a hora está entre a hora do nascer do sol e a hora do por do sol
    if (timeNow.getHours() > this.state.nascer_do_sol.slice(0, 3) && timeNow.getHours() < this.state.por_do_sol.slice(0, 3)) {
      return true;
    }
    //verificamos se a hora é igual a hora do nascer do sol
    if (timeNow.getHours() === this.state.nascer_do_sol.slice(0, 3)){
      //verificamos se o minuto é maior ou igual o minuto do nascer do sol
      if (timeNow.getMinutes() > this.state.nascer_do_sol.slice(4, 6)){
        return true;
      }
      //caso o minuto seja igual, verificamos os segundos
      if (timeNow.getMinutes() === this.state.nascer_do_sol.slice(4, 6)){
        //caso o segundo seja maior ou igual
        if (timeNow.getSeconds() >= this.state.nascer_do_sol.slice(7, 9)){
          return true;
        }
        //caso o segundo seja menor
        if (timeNow.getSeconds() < this.state.nascer_do_sol.slice(7, 9)){
          return false;
        }
      }
      //caso o minuto seja menor que o do nascer do sol
      if (timeNow.getMinutes() < this.state.nascer_do_sol.slice(4, 6)){
        return false;
      }
    }
    //verificamos se a hora é igual a hora do por do sol
    if(timeNow.getHours() === this.state.por_do_sol.slice(0, 3)) {
    //verificamos se o minuto é menor ou igual o minuto do nascer do sol
      if (timeNow.getMinutes() < this.state.por_do_sol.slice(4, 6)){
        return true;
      }
      //caso o minuto seja igual, verificamos os segundos
      if (timeNow.getMinutes() === this.state.por_do_sol.slice(4, 6)){
        //caso o segundo seja maior ou igual
        if (timeNow.getSeconds() <= this.state.por_do_sol.slice(7, 9)){
          return true;
        }
        //caso o segundo seja menor
        if (timeNow.getSeconds() > this.state.por_do_sol.slice(7, 9)){
          return false;
        }
      }
      //caso o minuto seja maior que o do nascer do sol
      if (timeNow.getMinutes() > this.state.por_do_sol.slice(4, 6)){
        return false;
      }
    }
    //verificamos se a hora é menor que a hora do nascer do sol ou maior que a hora do por do sol
    if (timeNow.getHours() < this.state.nascer_do_sol.slice(0, 3) || timeNow.getHours() > this.state.por_do_sol.slice(0, 3)){
      return false
    }
  }
  updateWidgets = (gateOpen, gateDaytime, gateRain, lensExpositionTime) => {
    ReactDOM.render(<Gate
      open={gateOpen}
      daytime={gateDaytime}
      rain={gateRain}
      />,
      document.getElementById('gate')
    );
    ReactDOM.render(<Lens
      time={lensExpositionTime}
      />,
      document.getElementById('lens')
    );
  }
  componentDidMount() {
    this.requestSunriseSunsetTime();
  }
  render() {
      return (<div>
        <table align="center">
          <thead>
            <tr>
              <th><img src='../../images/sunrise.png' width="45%" alt="sunrise icon"/></th>
              <th><img src='../../images/sunset.png' width="45%" alt="sunset icon"/></th>
              <th>Duração do dia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.nascer_do_sol}</td>
              <td>{this.state.por_do_sol}</td>
              <td>{this.state.duracao_do_dia}</td>
            </tr>
          </tbody>
        </table>
      </div>
      )
    }
}
