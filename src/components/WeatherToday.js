import React, { Component } from "react";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
) 

class WeatherToday extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      currentDate: this.getCurrentDate(),
    };
  }
  getHourWithNumber(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours % 12 || 12; // Convierte las 0:00 en 12:00
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}.${formattedMinutes}`;
  }

  getDayWithNumber() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours % 12 || 12; // Convierte las 0:00 en 12:00
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}.${formattedMinutes}`;
  }


  getHourWithAMPM(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convierte las 0:00 en 12:00
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }


  getCurrentDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('en-US', { month: 'long' });
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${formattedDay} ${month}`;
  };

  render() {
    const { weatherData, name_city } = this.props;
    const { currentDate  } = this.state;
    const time_day = this.getDayWithNumber();
    const sunsetTime = this.getHourWithNumber(weatherData?.current.sunset);
    const data2 = {
      datasets: [
        {
          data: [],
          backgroundColor: ["#FCA542", "#F0F5FF"],
          borderColor: "#FCA542",
          borderWidth: 1,
        },
      ],
    };
    const data = {
      labels: ["Current Time", "Sunset Time"],
      datasets: [
        {
          data: [time_day, sunsetTime], // Aquí actualizas los datos
          backgroundColor: ["#FCA542", "#F0F5FF"],
          borderColor: "#FCA542",
          borderWidth: 1,
        },
      ],
    };
    const options = {
      elements: {
        arc: {
          borderWidth: 0, // Configura el ancho del borde del elemento arc según tus necesidades
        },
      },
      rotation: -90,
      circumference: 180,
      responsive: true,
      maintainAspectRatio: false, 
      plugins: {
      
        legend: {
          display: false // Establece display en false para ocultar los labels
        }
      },
    };
       return (
      <section className="toady-detail pt-100">
        <div className="container">
          <div className="title text-center">
            <h2 className="fw-5 fs-40 lh-120 ls-5 color-dark mb-16">
              Today Weather Details
            </h2>
            <p className=" fw-4 fs-16 lh-160 ls-2 color-gray mb-48">
             Discover today's weather details, from the current temperature to rain and wind forecasts. 
             Plan your day with accurate and up-to-date information
            </p>
          </div>
          {weatherData === null ? (
            <div className="row">
              <div className="col-xl-4 col-md-6 col-12 mb-xl-0 mb-3">
                <div className="detail bg-white-1 p-100 text-center" id="card-no-info">
                  <div className="d-flex align-items-center justify-content-around mb-32" >
                    <h4 className="fw-6 color-dark m-0"></h4>
                    <img src="" alt="" />
                  </div>
                  <h5 className="fw-5 fs-23 color-dark">Today, {currentDate}</h5>
                  <h2 className="fw-6 fs-95 lh-120 color-dark m-0">
                    0°C
                  </h2>
                  <p className="fw-6 mb-32 color-dark">info</p>
                  <div className="d-flex align-items-center justify-content-center mb-24">
                    <span className="color-dark text-end">0 km/h</span>
                    <span className="color-dark text-start">Wind</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="color-dark text-end">Hum</span>
                    <span className="color-dark text-start">0%</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-12 mb-xl-0 mb-3">
                <div className="detail bg-white-1 st-2 text-center mb-24">
                  <img
                    src="./assets/media/icon/windy-dark.png"
                    className=" mb-16"
                    alt=""
                  />
                  <div className="d-flex align-items-center justify-content-center">
                    <p className="fw-5 fs-23 m-0 color-dark">Wind</p>
                    <p className="fw-6 fs-23 m-0 ms-3 color-dark"></p>
                  </div>
                </div>
                <div className="detail bg-white-1 st-2 text-center ">
                  <i className="fas fa-eye" />
                  <div className="d-flex align-items-center justify-content-center">
                    <p className="fw-5 fs-23 m-0 color-dark">Visibility</p>
                    <p className="fw-6 fs-23 m-0 ms-3 color-dark"></p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-12">
                <div className="row">
                  <div className="col-xl-12 col-md-6 col-12">
                    <div className="detail bg-white-1 st-2 text-center mb-24">
                      <i className="fas fa-raindrops" />
                      <div className="d-flex align-items-center justify-content-center">
                        <p className="fw-5 fs-23 m-0 color-dark">Humidity</p>
                        <p className="fw-6 fs-23 m-0 ms-3 color-dark"></p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-md-6 col-12">
                    <div className="detail chart-block bg-white-1 st-2  text-center">
                      <div className="content">
                        <iframe
                          className="chartjs-hidden-iframe"
                          style={{
                            width: "100%",
                            display: "block",
                            border: 0,
                            height: 0,
                            margin: 0,
                            position: "absolute",
                            inset: 0,
                          }}
                        />
                        <div className="text-end">
                          <img
                            src="./assets/media/icon/sun-icon-sm.png"
                            className="mb-12"
                            alt=""
                          />
                        </div>
                        <div className="chart-container" style={{ width: '350px', height: '160px' }}>
                          <Pie data={data2} options={options} />
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="text-center">
                            <p className="color-dark-2">Sunrise</p>
                            <p className="color-dark-2 mb-0"></p>
                          </div>
                          <div className="text-center">
                            <p className="color-dark-2">Sunset</p>
                            <p className="color-dark-2 mb-0"></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-xl-4 col-md-6 col-12 mb-xl-0 mb-3">
                <div className="detail bg-white-1 p-100 text-center" id="card-dayWeather">
                  <div className="d-flex align-items-center justify-content-around mb-32">
                    <h4 className="fw-6 color-dark m-0">{name_city}</h4>
                    <img src={`./assets/media/icon/${weatherData.current.weather[0].icon}.png`} alt="" />
                  </div>
                  <h5 className="fw-5 fs-23 color-dark">Today, {currentDate}</h5>
                  <h2 className="fw-6 fs-95 lh-120 color-dark m-0">
                    {Math.round(weatherData.current.temp)}°C
                  </h2>
                  <p className="fw-6 mb-32 color-dark">{weatherData.current.weather[0].description}</p>
                  <div className="d-flex align-items-center justify-content-center mb-24">
                  <span className="color-dark text-end">{weatherData.current.wind_speed.toFixed(1)} m/s</span>
                      <span className="color-dark text-start">Wind</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="color-dark text-end">Hum</span>
                    <span className="color-dark text-start">{weatherData.current.humidity}%</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-12 mb-xl-0 mb-3">
                <div className="detail bg-white-1 st-2 text-center mb-24">
                  <img
                    src="./assets/media/icon/windy-dark.png"
                    className=" mb-16"
                    alt=""
                  />
                  <div className="d-flex align-items-center justify-content-center">
                    <p className="fw-5 fs-23 m-0 color-dark">Wind</p>
                    <p className="fw-6 fs-23 m-0 ms-3 color-dark">{weatherData.current.wind_speed.toFixed(1)} m/s</p>
                  </div>
                </div>
                <div className="detail bg-white-1 st-2 text-center ">
                  <i className="fas fa-eye" />
                  <div className="d-flex align-items-center justify-content-center">
                    <p className="fw-5 fs-23 m-0 color-dark">Visibility</p>
                    <p className="fw-6 fs-23 m-0 ms-3 color-dark">{weatherData.current.visibility / 1000} Km</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-12">
                <div className="row">
                  <div className="col-xl-12 col-md-6 col-12">
                    <div className="detail bg-white-1 st-2 text-center mb-24">
                      <i className="fas fa-raindrops" />
                      <div className="d-flex align-items-center justify-content-center">
                        <p className="fw-5 fs-23 m-0 color-dark">Humidity</p>
                        <p className="fw-6 fs-23 m-0 ms-3 color-dark">{weatherData.current.humidity}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-md-6 col-12">
                    <div className="detail chart-block bg-white-1 st-2  text-center">
                      <div className="content">
                        <iframe
                          className="chartjs-hidden-iframe"
                          style={{
                            width: "100%",
                            display: "block",
                            border: 0,
                            height: 0,
                            margin: 0,
                            position: "absolute",
                            inset: 0,
                          }}
                        />
                        <div className="text-end">
                          <img
                            src="./assets/media/icon/sun-icon-sm.png"
                            className="mb-12"
                            alt=""
                          />
                        </div>
                        <div className="chart-container" style={{ width: '350px', height: '160px' }}>
                          <Pie data={data} options={options} />
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="text-center">
                            <p className="color-dark-2">Sunrise</p>
                            <p className="color-dark-2 mb-0">{this.getHourWithAMPM(weatherData.current.sunrise)}</p>
                          </div>
                          <div className="text-center">
                            <p className="color-dark-2">Sunset</p>
                            <p className="color-dark-2 mb-0">{this.getHourWithAMPM(weatherData.current.sunset)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default WeatherToday;
