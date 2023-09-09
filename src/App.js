import React, { Component } from "react";
import CiudadClima from "./components/CityClima";
import WeatherDaily from "./components/WeathesDaily";
import WeatherHours from "./components/WeatherHours";
import WeatherToday from "./components/WeatherToday";
import WeatherHistorys from "./components/WeatherHistorys";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
      name_city: "",
      weatherDailyData: null,
      weatherHoursData: null,
      isDefault: false
    };
  }

  
  updateWeatherData = (weatherData, name_city) => {
    this.setState({
      weatherData,
      name_city,
      weatherDailyData: weatherData.daily,
      weatherHoursData: weatherData.hourly,
      isDefault: true
    });
  };
 

  render() {
    const { uuid } = this.state;
    return (
      <div id="main-wrapper" className="main-wrapper overflow-hidden">
        <CiudadClima onWeatherDataUpdate={this.updateWeatherData} />
        <WeatherToday weatherData={this.state.weatherData} name_city={this.state.name_city} />
        <WeatherHours weatherHoursData={this.state.weatherHoursData}/>
        <WeatherHistorys isDefault={this.state.isDefault}/>
        <WeatherDaily weatherDailyData={this.state.weatherDailyData} />
        <div id="footer-app">
        </div>
      </div>
    );
  }
}

export default App;
