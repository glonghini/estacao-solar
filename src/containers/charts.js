import React from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';

import {ChartComponent} from '../components/charts.js';

export class Chart extends React.Component {
  state = {
    //dados para os logs de temperatura
    dataMatrixTempHumi: [],
    dataMatrixUV: [],
    //constantes para verificação do intervalo do dia
    firstDaytimePosition: 0,
    lastDaytimePosition: 0,
    //constantes de estado do gráfico
    isTempActive: true,
    isHumiActive: false,
    isUVActive: true,
    is30sActive: false,
    is1mActive: false,
    is5mActive: false,
    is15mActive: true,
    is30mActive: false,
    is1hActive: false,
    //dataNow: 'Temperatura',
    timeScaleNow: '15m',
    //chart data para ser plotada no gráfico
    chartData: {
      labels: [],
      datasets: [
        {
          label: 'Temperatura',
          fontSize: 10,
          id: 'y-axis-left',
          data: [],
          backgroundColor: []
        },
        {
          label: 'Umidade',
          yAxisID: 'y-axis-left',
          data: [],
          backgroundColor: []
        },
        {
          label: 'Índice UV',
          yAxisID: 'y-axis-right',
          data: [],
          backgroundColor: []
        }
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [
            {
              stacked: false,
              position: "left",
              id: "y-axis-left",
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                 display: false
              }
            },
            {
              stacked: true,
              position: "right",
              id: "y-axis-right",
              gridLines: {
                 display: false
              }
          }]
        }
      }
    }
  }
  //função periódica dos requests
  requestTempHumiUV = () => {
    axios.get('http://143.107.235.2:8000/sensors/files/logsUV/log-' + this.dataDateRequest() + '.txt')
      .then(response => {
        this.createMatrixUV(response.data);
        this.refreshData();
      })
      .catch(error => {
        console.log('erro com o request do histórico de temperatura e umidade');
        console.log(error);
      })
    axios.get('http://143.107.235.2:8000/sensors/files/logs/log-' + this.dataDateRequest() + '.txt')
      .then(response => {
        this.createMatrixTempHumi(response.data);
        this.refreshData();
      })
      .catch(error => {
        console.log('erro com o request do histórico uv');
        console.log(error);
      })
    setTimeout(this.requestTempHumiUV, 30*1000);
  }
  //função para construir a string com a data para os requests do axios
  dataDateRequest = () => {
    const myDate = new Date();
    //verifica-se se o dia e o mês estão entre 1 e 9 para adicionar o 0 antes do dígito
    if (myDate.getDate() < 10) {
      if (myDate.getMonth()+1 < 10) {
        //soma-se 1 no mês porque janeiro é o mês 0 e dezembro o mês 11
        return('0' + myDate.getDate() + '_0' + (myDate.getMonth()+1) + '_' + myDate.getFullYear());
      }
    //verifica-se se somente o dia está entre 1 e 9 para adicionar o 0 antes do dígito
    } else if (myDate.getDate() < 10) {
      //soma-se 1 no mês porque janeiro é o mês 0 e dezembro o mês 11
      return('0' + myDate.getDate() + '_' + (myDate.getMonth()+1) + '_' + myDate.getFullYear());
    //verifica-se se somente o mês está entre 1 e 9 para adicionar o 0 antes do dígito
    } else if (myDate.getMonth()+1 < 10){
      //soma-se 1 no mês porque janeiro é o mês 0 e dezembro o mês 11
      return(myDate.getDate() + '_0' + (myDate.getMonth()+1) + '_' + myDate.getFullYear());
    //se nem o dia nem mês estão entre 1 e 9
    } else {
      //soma-se 1 no mês porque janeiro é o mês 0 e dezembro o mês 11
      return(myDate.getDate() + '_' + (myDate.getMonth()+1) + '_' + myDate.getFullYear());
    }
  }
  //função para criar a matriz com os dados de temperatura
  createMatrixTempHumi = (string) => {
    //função para criar a matrix dos dados recebidos da API
    //ao fazer o GET na API, recebemos uma string com todos os dados. Precisamos transformar em um matriz.
    //primeiro, esvaziamos a matriz, pois ela é atrualizada a cada request
    this.state.dataMatrixTempHumi = [];

    //o javascript conta o enter (\n) como um caracter, substituimos esses caracteres por tabs
    const myString = string.replace(/\n/g, '\t');

    //separamos todos os valores por tabs
    const myArray = myString.split('\t');

    //criamos vetores de 10 posições, que é o número de colunas da matrix da API, cada posição sendo uma string, os valores
    var counter, chunk = 6;
    for (counter = 0; counter < myArray.length; counter += chunk) {
      this.state.dataMatrixTempHumi.push(myArray.slice(counter, counter + chunk));
    }
  }
  //função para criar a matriz com os dados de indice UV
  createMatrixUV = (string) => {
    //função para criar a matrix dos dados recebidos da API
    //ao fazer o GET na API, recebemos uma string com todos os dados. Precisamos transformar em um matriz.
    //primeiro, esvaziamos a matriz, pois ela é atrualizada a cada request
    this.state.dataMatrixUV = [];

    //o javascript conta o enter (\n) como um caracter, substituimos esses caracteres por tabs
    const myString = string.replace(/\n/g, '\t');

    //separamos todos os valores por tabs
    const myArray = myString.split('\t');

    //criamos vetores de 10 posições, que é o número de colunas da matrix da API, cada posição sendo uma string, os valores
    var counter, chunk = 12;
    for (counter = 0; counter < myArray.length; counter += chunk) {
      this.state.dataMatrixUV.push(myArray.slice(counter, counter + chunk));
    }
  }
  //função para criar os vetores com os dados a serem mostrados de acordo com a escala de tempo
  dataTimeScaleBuilder = (timeScale, dataName) => {
    //matriz importada do state
    var matrix = [];

    //vetores para receber os valores tratados
    const label = [];
    const data = [];

    //counter para os for loops
    var counter = 0;
    var column = 0;

    //primeiro, importamos a matrix com os dados que queremos para trata-la
    if (dataName === 'Temperatura'){
      this.matrix = this.state.dataMatrixTempHumi;
      column = 3;
    }
    else if(dataName === 'Umidade') {
      this.matrix = this.state.dataMatrixTempHumi;
      column = 4;
    }
    else if (dataName === 'UV') {
      this.matrix = this.state.dataMatrixUV;
      column = 3;
    }
    //segundo, vemos qual posição do vetor o sol ja nasceu e qual posição o sol ja se pôs
    //procurando a primeira posição do dia
    counter = 0;
    while (counter <= this.matrix.length-1) {
      if (this.matrix[counter][0].slice(0, 2) >= 5 && this.matrix[counter][0].slice(0, 2) <= 20) {
        this.state.firstDaytimePosition = counter;
        break;
      } else {
        counter++;
      }
    }
    //procurando a última posição do dia
    counter = 0;
    while (counter <= this.matrix.length-1) {
      if (this.matrix[counter][0].slice(0, 2) >= 20 || counter === this.matrix.length-1) {
        this.state.lastDaytimePosition = counter;
        break;
      } else {
        counter++;
      }
    }
    //checando se houve erro na captura dos dados
    if (this.state.firstDaytimePosition === null) {
      console.log("erro na captura dos dados: não houve captura durante o dia");
    } else if (this.state.lastDaytimePosition === null) {
      console.log("erro na captura dos dados: não houve captura durante o dia");
    }
    //terceiro, tratamos os dados de acordo com a escala do tempo
    if (timeScale === '30s') {
      //timeStep é a variável que vai pegar os pontos em um certo intervalo
      //como nossa primeira escala é de 30s, temos que pegar todos os pontos
      const timeStep = 1;
      for (counter = this.state.firstDaytimePosition; counter < Math.min(this.matrix.length-1, this.state.lastDaytimePosition); counter += timeStep) {
        label.push(this.matrix[counter][0]);
        data.push(this.matrix[counter][column]);
      }
    }
    else if (timeScale === '1m') {
      const timeStep = 2;
      for (counter = this.state.firstDaytimePosition; counter < Math.min(this.matrix.length-1, this.state.lastDaytimePosition); counter += timeStep) {
        label.push(this.matrix[counter][0].slice(0, 5));
        data.push(this.matrix[counter][column]);
      }
    }
    else if (timeScale === '5m') {
      const timeStep = 10;
      for (counter = this.state.firstDaytimePosition; counter < Math.min(this.matrix.length-1, this.state.lastDaytimePosition); counter += timeStep) {
        label.push(this.matrix[counter][0].slice(0, 5));
        data.push(this.matrix[counter][column]);
      }
    }
    else if (timeScale === '15m') {
      const timeStep = 30;
      for (counter = this.state.firstDaytimePosition; counter < Math.min(this.matrix.length-1, this.state.lastDaytimePosition); counter += timeStep) {
        label.push(this.matrix[counter][0].slice(0, 5));
        data.push(this.matrix[counter][column]);
      }
    }
    else if (timeScale === '30m') {
      const timeStep = 60;
      for (counter = this.state.firstDaytimePosition; counter < Math.min(this.matrix.length-1, this.state.lastDaytimePosition); counter += timeStep) {
        label.push(this.matrix[counter][0].slice(0, 5));
        data.push(this.matrix[counter][column]);
      }
    }
    else if (timeScale === '1h') {
      const timeStep = 120;
      for (counter = this.state.firstDaytimePosition; counter < Math.min(this.matrix.length-1, this.state.lastDaytimePosition); counter += timeStep) {
        label.push(this.matrix[counter][0].slice(0, 2)+'h');
        data.push(this.matrix[counter][column]);
      }
    }

    return [label, data];
  }
  //funções para mudar os dados do gráfico
  changeDataTemp = () => {
    const returnedValues = this.dataTimeScaleBuilder(this.state.timeScaleNow, 'Temperatura');

    if (this.state.isTempActive) {
      this.state.chartData.datasets[0].data = [];
      this.state.chartData.datasets[0].backgroundColor = [];
    } else {
      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[0].data = returnedValues[1];
      this.state.chartData.datasets[0].backgroundColor = ['rgba(255, 0, 0, 0.5)'];
    }

    this.state.isTempActive = !this.state.isTempActive;

    if (this.state.isTempActive === false && this.state.isHumiActive === false && this.state.isUVActive === false) {
      this.state.chartData.labels = [];
    }

    this.forceUpdate();
  }
  changeDataHumi = () => {
    const returnedValues = this.dataTimeScaleBuilder(this.state.timeScaleNow, 'Umidade');

    if (this.state.isHumiActive) {
      this.state.chartData.datasets[1].data = [];
      this.state.chartData.datasets[1].backgroundColor = [];
    } else {
      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[1].data = returnedValues[1];
      this.state.chartData.datasets[1].backgroundColor = ['rgba(0, 0, 255, 0.5)'];
    }

    this.state.dataNow = 'Umidade';

    this.state.isHumiActive = !this.state.isHumiActive;

    if (this.state.isTempActive === false && this.state.isHumiActive === false && this.state.isUVActive === false) {
      this.state.chartData.labels = [];
    }

    this.forceUpdate();
  }
  changeDataUV = () => {
    const returnedValues = this.dataTimeScaleBuilder(this.state.timeScaleNow, 'UV')

    if (this.state.isUVActive) {
      this.state.chartData.datasets[2].data = [];
      this.state.chartData.datasets[2].backgroundColor = [];
    } else {
      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[2].data = returnedValues[1];
      this.state.chartData.datasets[2].backgroundColor = ['rgba(192, 0, 255, 0.5)'];
    }

    this.state.dataNow = 'UV';

    this.state.isUVActive = !this.state.isUVActive;

    if (this.state.isTempActive === false && this.state.isHumiActive === false && this.state.isUVActive === false) {
      this.state.chartData.labels = [];
    }

    this.forceUpdate();
  }
  //funções para mudar a escala de tempo do gráfico
  changeTimeScale30s = () => {
    if (this.state.isTempActive) {
      const returnedValues = this.dataTimeScaleBuilder('30s', 'Temperatura');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[0].data = returnedValues[1];
    }
    if (this.state.isHumiActive) {
      const returnedValues = this.dataTimeScaleBuilder('30s', 'Umidade');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[1].data = returnedValues[1];
    }
    if (this.state.isUVActive) {
      const returnedValues = this.dataTimeScaleBuilder('30s', 'UV');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[2].data = returnedValues[1];
    }

    this.state.is30sActive = true;
    this.state.is1mActive = false;
    this.state.is5mActive = false;
    this.state.is15mActive = false;
    this.state.is30mActive = false;
    this.state.is1hActive = false;

    this.state.timeScaleNow = '30s';

    this.forceUpdate();
  }
  changeTimeScale1m = () => {
    if (this.state.isTempActive) {
      const returnedValues = this.dataTimeScaleBuilder('1m', 'Temperatura');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[0].data = returnedValues[1];
    }
    if (this.state.isHumiActive) {
      const returnedValues = this.dataTimeScaleBuilder('1m', 'Umidade');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[1].data = returnedValues[1];
    }
    if (this.state.isUVActive) {
      const returnedValues = this.dataTimeScaleBuilder('1m', 'UV');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[2].data = returnedValues[1];
    }

    this.state.is30sActive = false;
    this.state.is1mActive = true;
    this.state.is5mActive = false;
    this.state.is15mActive = false;
    this.state.is30mActive = false;
    this.state.is1hActive = false;

    this.state.timeScaleNow = '1m';

    this.forceUpdate();
  }
  changeTimeScale5m = () => {
    if (this.state.isTempActive) {
      const returnedValues = this.dataTimeScaleBuilder('5m', 'Temperatura');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[0].data = returnedValues[1];
    }
    if (this.state.isHumiActive) {
      const returnedValues = this.dataTimeScaleBuilder('5m', 'Umidade');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[1].data = returnedValues[1];
    }
    if (this.state.isUVActive) {
      const returnedValues = this.dataTimeScaleBuilder('5m', 'UV');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[2].data = returnedValues[1];
    }

    this.state.is30sActive = false;
    this.state.is1mActive = false;
    this.state.is5mActive = true;
    this.state.is15mActive = false;
    this.state.is30mActive = false;
    this.state.is1hActive = false;

    this.state.timeScaleNow = '5m';

    this.forceUpdate();
  }
  changeTimeScale15m = () => {
    if (this.state.isTempActive) {
      const returnedValues = this.dataTimeScaleBuilder('15m', 'Temperatura');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[0].data = returnedValues[1];
    }
    if (this.state.isHumiActive) {
      const returnedValues = this.dataTimeScaleBuilder('15m', 'Umidade');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[1].data = returnedValues[1];
    }
    if (this.state.isUVActive) {
      const returnedValues = this.dataTimeScaleBuilder('15m', 'UV');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[2].data = returnedValues[1];
    }

    this.state.is30sActive = false;
    this.state.is1mActive = false;
    this.state.is5mActive = false;
    this.state.is15mActive = true;
    this.state.is30mActive = false;
    this.state.is1hActive = false;

    this.state.timeScaleNow = '15m';

    this.forceUpdate();
  }
  changeTimeScale30m = () => {
    if (this.state.isTempActive) {
      const returnedValues = this.dataTimeScaleBuilder('30m', 'Temperatura');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[0].data = returnedValues[1];
    }
    if (this.state.isHumiActive) {
      const returnedValues = this.dataTimeScaleBuilder('30m', 'Umidade');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[1].data = returnedValues[1];
    }
    if (this.state.isUVActive) {
      const returnedValues = this.dataTimeScaleBuilder('30m', 'UV');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[2].data = returnedValues[1];
    }

    this.state.is30sActive = false;
    this.state.is1mActive = false;
    this.state.is5mActive = false;
    this.state.is15mActive = false;
    this.state.is30mActive = true;
    this.state.is1hActive = false;

    this.state.timeScaleNow = '30m';

    this.forceUpdate();
  }
  changeTimeScale1h = () => {
    if (this.state.isTempActive) {
      const returnedValues = this.dataTimeScaleBuilder('1h', 'Temperatura');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[0].data = returnedValues[1];
    }
    if (this.state.isHumiActive) {
      const returnedValues = this.dataTimeScaleBuilder('1h', 'Umidade');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[1].data = returnedValues[1];
    }
    if (this.state.isUVActive) {
      const returnedValues = this.dataTimeScaleBuilder('1h', 'UV');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[2].data = returnedValues[1];
    }

    this.state.is30sActive = false;
    this.state.is1mActive = false;
    this.state.is5mActive = false;
    this.state.is15mActive = false;
    this.state.is30mActive = false;
    this.state.is1hActive = true;

    this.state.timeScaleNow = '1h';

    this.forceUpdate();
  }
  //função para atualizar o gráfico junto com os requests
  refreshData = () => {
    if (this.state.isTempActive) {
      const returnedValues = this.dataTimeScaleBuilder(this.state.timeScaleNow, 'Temperatura');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[0].data = returnedValues[1];

      this.state.chartData.datasets[0].label = 'Temperatura';
      this.state.chartData.datasets[0].backgroundColor = ['rgba(255, 0, 0, 0.5)'];
    }
    if(this.state.isHumiActive) {
      const returnedValues = this.dataTimeScaleBuilder(this.state.timeScaleNow, 'Umidade');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[1].data = returnedValues[1];

      this.state.chartData.datasets[1].label = 'Umidade';
      this.state.chartData.datasets[1].backgroundColor = ['rgba(0, 0, 255, 0.5)'];
    }
    if (this.state.isUVActive) {
      const returnedValues = this.dataTimeScaleBuilder(this.state.timeScaleNow, 'UV');

      this.state.chartData.labels = returnedValues[0];
      this.state.chartData.datasets[2].data = returnedValues[1];

      this.state.chartData.datasets[2].label = 'Índice UV';
      this.state.chartData.datasets[2].backgroundColor = ['rgba(192, 0, 255, 0.5)'];
    }

    this.forceUpdate();
  }

  componentDidMount() {
    this.requestTempHumiUV();
  }
  render() {
    return(
      <div>
        <div width="10%">
          <table>
            <thead>
              <tr>
                <th colSpan="3">Medida</th>
                <th colSpan="6">Escala de Tempo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input className={this.state.isTempActive ? 'button-temp-chart' : 'button'} value="Temperatura" type="button" onClick={this.changeDataTemp}/></td>
                <td><input className={this.state.isHumiActive ? 'button-humi-chart' : 'button'} value="Umidade" type="button" onClick={this.changeDataHumi}/></td>
                <td><input className={this.state.isUVActive ? 'button-uv-chart' : 'button'} value="Índice UV" type="button" onClick={this.changeDataUV}/></td>

                <td><input className={this.state.is30sActive ? 'button-time-chart' : 'button'} value="30s" type="button" onClick={this.changeTimeScale30s}/></td>
                <td><input className={this.state.is1mActive ? 'button-time-chart' : 'button'} value="1m" type="button" onClick={this.changeTimeScale1m}/></td>
                <td><input className={this.state.is5mActive ? 'button-time-chart' : 'button'} value="5m" type="button" onClick={this.changeTimeScale5m}/></td>
                <td><input className={this.state.is15mActive ? 'button-time-chart' : 'button'} value="15m" type="button" onClick={this.changeTimeScale15m}/></td>
                <td><input className={this.state.is30mActive ? 'button-time-chart' : 'button'} value="30m" type="button" onClick={this.changeTimeScale30m}/></td>
                <td><input className={this.state.is1hActive ? 'button-time-chart' : 'button'} value="1h" type="button" onClick={this.changeTimeScale1h}/></td>
              </tr>
            </tbody>
          </table>
        </div>
      <ChartComponent chartData={this.state.chartData} />
    </div>
    )
  }
}
