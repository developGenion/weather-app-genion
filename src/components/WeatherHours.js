import React, { Component } from "react";
import Slider from "react-slick";


class WeatherHours extends Component {
  // Function to format a Unix timestamp into a readable hour format
  formatHour(unixTimestamp) {
    const currentDate = new Date();
    const inputDate = new Date(unixTimestamp * 1000);
  
    if (
      currentDate.getHours() === inputDate.getHours()
    ) {
      return "Now";
    }
  
    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours =
      hours % 12 === 0 ? 12 : hours % 12; // Convertir 0 a 12 en el formato de 12 horas
  
    const formattedMinutes = minutes.toString().padStart(2, "0");
  
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  render() {
    const { weatherHoursData } = this.props;
    const settings = {
      infinite: true, // Makes the slider infinite
      slidesToShow: 6, // Number of visible containers at once
      slidesToScroll: 1, // Number of visible containers at once
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 995,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          },
        },
        
      ],
    };
    return (
      <section className="hourly pt-100">
      <div className="container">
        <div className="title text-center">
          <h2 className="fw-5 fs-40 lh-120 ls-5 color-dark mb-16">
            Hourly Update{" "}
          </h2>
          <p className="fw-4 fs-16 lh-160 ls-2 color-gray mb-48">
          Stay up to date with hourly weather updates, including temperature changes, rain probabilities, 
          and wind variations. Plan your activities with precision.
          </p>
        </div>
        <div className="hourly-slider slick-initialized slick-slider">
             <Slider {...settings}>
             {weatherHoursData &&
                  weatherHoursData.length > 0 &&
                  weatherHoursData.map((info, index) => (
                    <div
                    className="slider-block slick-slide slick-current slick-active"
                    data-slick-index={0}
                    aria-hidden="false"
                    tabIndex={0}
                    style={{ width: "170px" }}
                  >
                    <div className="content text-center">
                      <img
                         src={`https://openweathermap.org/img/wn/${info.weather[0].icon}.png`}
                        alt="Weather Icon"
                      />
                      <p className="fs-28 fw-4 mb-1" id="temp-inf">
                      {Math.round(info.temp)}°
                      </p>
                      <h2 className="fw-5 fs-19 mb-0">
                      {info.weather[0].description}
                      </h2>
                      <div className="line" />
                      <div className="d-flex justify-content-center align-items-center mb-1">
                        <div className="weather-detail left-line">
                          <i className="fas fa-tint" />
                          <p className="fs-16 fw-4 lh-160 m-0">
                          {info.humidity}%
                          </p>
                        </div>
                        <div className="weather-detail">
                          <i className="fal fa-wind fa-flip-vertical" />
                          <p className="fs-16 fw-4 lh-160 m-0">{info.wind_speed.toFixed(1)} m/s</p>
                        </div>
                      </div>
                      <h2 className="fw-4 fs-19 m-0">
                      {this.formatHour(info.dt)}
                      </h2>
                    </div>
                  </div>
              ))}
              </Slider> 
            </div>


      </div>
    </section>
    

    );
  }
}

export default WeatherHours;
