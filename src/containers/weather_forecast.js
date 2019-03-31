import React from 'react';
import axios from 'axios';

import {WeatherForecastComponent} from '../components/weather_forecast.js';

export class WeatherForecast extends React.Component {
  state = {
    //constantes de informação geral
    cidade: null,
    frase: null,
    data: null,
    //constantes do primeiro dia, hoje
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
  todayWeatherForecast = () =>{
    //utilizando o método get para pegar os dados da API do climatempo
    axios.get('http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3680/days/15?token=2e30b5793b0c662d9b901520663bd4d0')
      .then(response => {
        console.log(response.data);
        this.setState(
          {
            //constantes de informação geral
            cidade: response.data.name,
            frase: response.data.data[0].text_icon.text.pt,
            //constantes do primeiro dia, hoje
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
  componentDidMount() {
    this.todayWeatherForecast();
    }
  render() {
    return (
      <WeatherForecastComponent
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
  );
  }
}
