import React from 'react';
import axios from 'axios';

import { Lens } from '../components/Lens.js';
import { Gate } from '../components/Gate.js';
import { Chart } from '../containers/charts.js';
import { Camera } from '../components/Camera.js';
import { UVIndex } from '../components/UVIndex.js';
//import { Switch } from '../components/switch.js';
import { TempHumi } from '../components/TempHumi.js';
import { SunriseSunset } from '../components/SunriseSunset.js';
import { WeatherForecast } from '../components/WeatherForecast.js';

export class Home extends React.Component {
  state = {
    //constantes para o component TempHumi.js
    temperaturaClimatempo: null,
    umidadeClimatempo: null,
    temperaturaSEL: null,
    umidadeSEL: null,
    uvSEL: null,
    chuvaSEL: null,
    //constantes para o component SunriseSunset.js
    nascerDoSol: null,
    porDoSol: null,
    duracaoDoDia: null,
    //constantes para o component Gate.js
    isGateOpen: null,
    isRaining: null,
    isDaytime: null,
    //constantes para o component Lens.js
    expositionTime: null,
    //constantes para o component WeatherForecast.js
    cidade: null,
    frase: null,
    data: null,
    iconManha: null,
    iconTarde: null,
    iconNoite: null,
    probabilidadeChuva: null,
    precipitacaoChuva: null,
    temperaturaMin: null,
    temperaturaMax: null,
    umidadeMin: null,
    umidadeMax: null,
    ventoMin: null,
    ventoMax: null,
  }
  requestClimatempo = () => {
  //Fetch da API do Climatempo
    axios.get('http://apiadvisor.climatempo.com.br/api/v1/weather/locale/3680/current?token=2e30b5793b0c662d9b901520663bd4d0')
      .then(response => {
        console.log(response.data);
        this.setState(
          {
            temperaturaClimatempo: response.data.data.temperature + '°C',
            umidadeClimatempo: response.data.data.humidity + '%',
          }
        );
      })
      .catch(error => {
        console.log('erro com o request do climatempo');
        console.log(error);
      });
      setTimeout(this.requestClimatempo, 1000*60*5);
  }
  requestLioSensors = () => {
    //Fetch da API do liosensors
    axios.get('http://www.sel.eesc.usp.br/liosensors/json_data.php')
      .then(response => {
        console.log(response.data);
        this.setState(
          {
            temperaturaSEL: response.data.lastTemp + '°C',
            umidadeSEL: response.data.lastHum + '%',
            uvSEL: Math.round(response.data.lastUV),
            chuvaSEL: response.data.Rain
          }
        );
      })
      .catch(error => {
        console.log('erro com o request dos nossos sensores na SEL');
        console.log(error);
      })
      setTimeout(this.requestLioSensors, 1000*30);
  }
  requestSunriseSunsetTime = () => {
    //utilizando o método get para pegar os dados da API da Beaglebone da SEL
    axios.get('http://143.107.235.2:8000/sensors/data/')
      .then(response => {
        console.log(response.data);
        this.setState(
          {
            nascerDoSol: response.data.sensors[0].local.sunrise.slice(10,19),
            porDoSol: response.data.sensors[0].local.sunset.slice(10,19),
            duracaoDoDia: response.data.sensors[0].local.time.slice(10,19),
            isGateOpen: response.data.sensors[0].open,
            isRaining: response.data.sensors[0].rain,
            expositionTime: response.data.sensors[0].ExpositionTime
          }
        );
        //Fiz o checkDaytime() aqui pois é preciso primeiro ter os dados de nascerDoSol e porDoSol para saber se é dia
        this.checkDaytime();
      })
      .catch(error => {
        console.log('erro com o request do 143.107.235.2:8000');
        console.log(error);
      })
    setTimeout(this.requestSunriseSunsetTime, 30*1000);
  }
  requestTodayWeatherForecast = () =>{
    //utilizando o método get para pegar os dados da API do climatempo
    axios.get('http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3680/days/15?token=2e30b5793b0c662d9b901520663bd4d0')
      .then(response => {
        console.log(response.data);
        this.setState(
          {
            cidade: response.data.name,
            frase: response.data.data[0].text_icon.text.pt,
            data: response.data.data[0].date_br,
            iconManha: "../images/" + response.data.data[0].text_icon.icon.morning + ".png",
            iconTarde: "../images/" + response.data.data[0].text_icon.icon.afternoon + ".png",
            iconNoite: "../images/" + response.data.data[0].text_icon.icon.night + ".png",
            probabilidadeChuva: response.data.data[0].rain.probability,
            precipitacaoChuva: response.data.data[0].rain.precipitation,
            temperaturaMin: response.data.data[0].temperature.min,
            temperaturaMax: response.data.data[0].temperature.max,
            umidadeMin: response.data.data[0].humidity.min,
            umidadeMax: response.data.data[0].humidity.max,
            ventoMin: response.data.data[0].wind.velocity_min,
            ventoMax: response.data.data[0].wind.velocity_max,
          }
        );
      })
      .catch(error => {
        console.log('erro com o request da previsão do tempo do climatempo');
        console.log(error);
      })
    setTimeout(this.todayWeatherForecast, 1000*60*60);
    this.forceUpdate();
  }
  checkDaytime = () => {
    const timeNow = new Date();
    //verificamos se a hora está entre a hora do nascer do sol e a hora do por do sol
    if (timeNow.getHours() > this.state.nascerDoSol.slice(0, 3) && timeNow.getHours() < this.state.porDoSol.slice(0, 3)) {
      this.setState({isDaytime: true});
    }
    //verificamos se a hora é igual a hora do nascer do sol
    if (timeNow.getHours() === this.state.nascerDoSol.slice(0, 3)){
      //verificamos se o minuto é maior ou igual o minuto do nascer do sol
      if (timeNow.getMinutes() > this.state.nascerDoSol.slice(4, 6)){
        this.setState({isDaytime: true});
      }
      //caso o minuto seja igual, verificamos os segundos
      if (timeNow.getMinutes() === this.state.nascerDoSol.slice(4, 6)){
        //caso o segundo seja maior ou igual
        if (timeNow.getSeconds() >= this.state.nascerDoSol.slice(7, 9)){
          this.setState({isDaytime: true});
        }
        //caso o segundo seja menor
        if (timeNow.getSeconds() < this.state.nascerDoSol.slice(7, 9)){
          this.setState({isDaytime: false});
        }
      }
      //caso o minuto seja menor que o do nascer do sol
      if (timeNow.getMinutes() < this.state.nascerDoSol.slice(4, 6)){
        this.setState({isDaytime: false});
      }
    }
    //verificamos se a hora é igual a hora do por do sol
    if(timeNow.getHours() === this.state.porDoSol.slice(0, 3)) {
    //verificamos se o minuto é menor ou igual o minuto do nascer do sol
      if (timeNow.getMinutes() < this.state.porDoSol.slice(4, 6)){
        this.setState({isDaytime: true});
      }
      //caso o minuto seja igual, verificamos os segundos
      if (timeNow.getMinutes() === this.state.porDoSol.slice(4, 6)){
        //caso o segundo seja maior ou igual
        if (timeNow.getSeconds() <= this.state.porDoSol.slice(7, 9)){
          this.setState({isDaytime: true});
        }
        //caso o segundo seja menor
        if (timeNow.getSeconds() > this.state.porDoSol.slice(7, 9)){
          this.setState({isDaytime: false});
        }
      }
      //caso o minuto seja maior que o do nascer do sol
      if (timeNow.getMinutes() > this.state.porDoSol.slice(4, 6)){
        this.setState({isDaytime: false});
      }
    }
    //verificamos se a hora é menor que a hora do nascer do sol ou maior que a hora do por do sol
    if (timeNow.getHours() < this.state.nascerDoSol.slice(0, 3) || timeNow.getHours() > this.state.porDoSol.slice(0, 3)){
      this.setState({isDaytime: false});
    }
  }
  componentDidMount() {
    this.requestClimatempo();
    this.requestLioSensors();
    this.requestSunriseSunsetTime();
    this.requestTodayWeatherForecast();
  }
  render() {
    return (
      <div>
        <div className='left-box'>
          <h2>Temperatura e Humidade</h2>
          <TempHumi
            temperaturaClimatempo={this.state.temperaturaClimatempo}
            umidadeClimatempo={this.state.umidadeClimatempo}
            temperaturaSEL={this.state.temperaturaSEL}
            umidadeSEL={this.state.umidadeSEL}
            chuvaSEL={this.state.chuvaSEL}
          />
          <h2>Índice UV</h2>
          <UVIndex
            uvSEL={this.state.uvSEL}
          />
          <h2>Lentes</h2>
          <Lens
            time={this.state.expositionTime}
          />
        </div>
        <div className='center-box'>
          <h2>Câmera e Gráfico</h2>
          <Camera />
          <Chart />
        </div>
        <div className='right-box'>
          <h2>Previsão do Tempo</h2>
          <WeatherForecast
            cidade={this.state.cidade}
            frase={this.state.frase}
            data={this.state.data}
            iconManha={this.state.iconManha}
            iconTarde={this.state.iconTarde}
            iconNoite={this.state.iconNoite}
            probabilidadeChuva={this.state.probabilidadeChuva}
            precipitacaoChuva={this.state.precipitacaoChuva}
            temperaturaMin={this.state.temperaturaMin}
            temperaturaMax={this.state.temperaturaMax}
            umidadeMin={this.state.umidadeMin}
            umidadeMax={this.state.umidadeMax}
            ventoMin={this.state.ventoMin}
            ventoMax={this.state.ventoMax}
          />
          <h2>Nacer e Pôr do Sol</h2>
          <SunriseSunset
            nascerDoSol={this.state.nascerDoSol}
            porDoSol={this.state.porDoSol}
            duracaoDoDia={this.state.duracaoDoDia}
          />
          <h2>Estado do Portão</h2>
          <Gate
            isGateOpen={this.state.isGateOpen}
            isDaytime={this.state.isDaytime}
            isRaining={this.state.isRaining}
          />
        </div>
      </div>
    )
  }
}
