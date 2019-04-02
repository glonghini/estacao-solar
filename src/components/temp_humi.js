import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {UVIndex} from "./uv_index.js";

export class TempHumi extends React.Component {
  state = {
    //constantes do tempo atual do climatempo
    temperatura_CT: null,
    umidade_CT: null,
    //constantes dos sensores da SEL
    temperatura_SEL: null,
    umidade_SEL: null,
    uv_SEL: null,
    chuva_SEL: null
  }
  requestClimatempo = () => {
    axios.get('http://apiadvisor.climatempo.com.br/api/v1/weather/locale/3680/current?token=2e30b5793b0c662d9b901520663bd4d0')
      .then(response => {
        console.log(response.data);
        this.setState(
          {
            temperatura_CT: response.data.data.temperature + '°C',
            umidade_CT: response.data.data.humidity + '%',
          }
        );
        this.updateWidgets();
      })
      .catch(error => {
        console.log('erro com o request do climatempo');
        console.log(error);
      });
      setTimeout(this.requestClimatempo, 1000*60*5);
  }
  requestLioSensors = () => {
    axios.get('http://www.sel.eesc.usp.br/liosensors/json_data.php')
      .then(response => {
        console.log(response.data);
        this.setState(
          {
            temperatura_SEL: response.data.lastTemp + '°C',
            umidade_SEL: response.data.lastHum + '%',
            uv_SEL: Math.round(response.data.lastUV),
            chuva_SEL: response.data.Rain
          }
        );
        this.updateWidgets();
      })
      .catch(error => {
        console.log('erro com o request dos nossos sensores na SEL');
        console.log(error);
      })
      setTimeout(this.requestLioSensors, 1000*30);

  }
  updateWidgets = () => {
    //Renderizando o indice UV
    ReactDOM.render(<UVIndex uv_sel={this.state.uv_SEL}/>, document.getElementById('uv-index'));
  }
  componentDidMount() {
    //utilizando o método get para pegar os dados da API do climatempo para o tempo atual
    this.requestClimatempo();
    this.requestLioSensors();
    }
  render() {
      return (<div>
 	     <fieldset>
        <legend>Temperatura e Umidade</legend>
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
         		  <td>{this.state.temperatura_SEL}</td>
         		  <td>{this.state.temperatura_CT}</td>
         	  </tr>
         	  <tr>
         		  <th><img src="../images/humidity.png" alt="humidity icon"/></th>
         		  <td>{this.state.umidade_SEL}</td>
         		  <td>{this.state.umidade_CT}</td>
         	  </tr>
            <tr>
         		  <th><img src="../images/rain.png" alt="rain icon"/></th>
         		  <td>{this.state.chuva_SEL}</td>
         		  <td></td>
         	  </tr>
          </tbody>
     	  </table>
      </fieldset>
   		</div>
   );
   }
}
