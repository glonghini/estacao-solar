import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './main.css';

import {Chart} from "./containers/charts.js";
import {Camera} from "./components/camera.js";
import {Header} from "./components/header.js";
//import {Switch} from "./components/switch.js";
import {TempHumi} from "./components/temp_humi.js";
import {SunriseSunset} from "./components/sunrise_sunset.js";
import {WeatherForecast} from "./containers/weather_forecast.js";

ReactDOM.render(<Chart />, document.getElementById('charts'));
ReactDOM.render(<Camera />, document.getElementById('camera'));
ReactDOM.render(<Header />, document.getElementById('header'));
//ReactDOM.render(<Switch />, document.getElementById(''));
ReactDOM.render(<TempHumi />, document.getElementById('temp-humi'));
ReactDOM.render(<SunriseSunset />, document.getElementById('sunrise-sunset'));
ReactDOM.render(<WeatherForecast />, document.getElementById('weather-forecast'));

serviceWorker.unregister();
