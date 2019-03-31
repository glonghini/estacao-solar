import React from 'react';
import axios from 'axios';

export class DataFetch extends React.Component {
  requestTempHumiUV = () => {
    axios.get('http://143.107.235.2:8000/sensors/files/logsUV/log-' + this.dataDateRequest() + '.txt')
      .then(response => {
        this.createMatrixUV(response.data);
        this.refreshData();
      })
      .catch(error => {
        console.log('erro com o request do histórico uv');
        console.log(error);
      })
    axios.get('http://143.107.235.2:8000/sensors/files/logs/log-' + this.dataDateRequest() + '.txt')
      .then(response => {
        this.createMatrixTempHumi(response.data);
        this.refreshData();
      })
      .catch(error => {
        console.log('erro com o request do histórico de temperatura e umidade');
        console.log(error);
      })
    setTimeout(this.requestTempHumiUV, 30*1000);
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
  todayWeatherForecast = () => {
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
            iconManha: "../../images/" + response.data.data[0].text_icon.icon.morning + ".png",
            iconTarde: "../../images/" + response.data.data[0].text_icon.icon.afternoon + ".png",
            iconNoite: "../../images/" + response.data.data[0].text_icon.icon.night + ".png",
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
    }

  componentDidMount() {
    //Em ordem alfabética, vamos fazer os axios.get
    //charts.js
    this.requestTempHumiUV();
    //sunrise_sunset.js
    this.requestSunriseSunsetTime();
    //sunrise_sunset.js
    this.requestClimatempo();
    this.requestLioSensors();
    //weather_forecast.js
    this.todayWeatherForecast();
  }
}
