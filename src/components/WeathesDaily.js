import React, { Component } from "react";
import Slider from "react-slick";



class WeatherDaily extends Component {
  // Function to get the day of the week from a Unix timestamp
  getDayOfWeek(unixTimestamp) {
    const currentDate = new Date();
    const inputDate = new Date(unixTimestamp * 1000);

    if (
      inputDate.getDate() === currentDate.getDate() &&
      inputDate.getMonth() === currentDate.getMonth() &&
      inputDate.getFullYear() === currentDate.getFullYear()
    ) {
      return "today";
    }

    return inputDate.toLocaleDateString("en-US", { weekday: "long" });
  }

  render() {
    const { weatherDailyData } = this.props;
    const settings = {
      infinite: true, // Makes the slider infinite
      slidesToShow: 6, // Number of visible containers at once
      slidesToScroll: 1,  // Number of containers to scroll at once
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
              Weekly Weather Forcast{" "}
            </h2>
            <p className="fw-4 fs-16 lh-160 ls-2 color-gray mb-48">
            Discover what's in store for the week with our detailed weekly weather forecast. Stay ahead with temperature trends, 
            rainfall predictions, and more for informed planning.
            </p>
          </div>
          <div className="hourly-slider slick-initialized slick-slider">
       
      
              <Slider {...settings}>
                {weatherDailyData &&
                  weatherDailyData.length > 0 &&
                  weatherDailyData.map((info, index) => (
                    <div
                      className="slider-block slick-slide slick-current slick-active"
                      data-slick-index={0}
                      aria-hidden="false"
                      tabIndex={0}
                      style={{ width: "190px" }}
                    >
                      <div className="content text-center">
                        <img
                          src={`https://openweathermap.org/img/wn/${info.weather[0].icon}.png`}
                          alt="Weather Icon"
                        />
                        <p className="fs-28 fw-4 mb-1" id="temp-dayInf">
                          {" "}
                          {Math.round(info.temp.max)}° /{" "}
                          {Math.round(info.temp.min)}°
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
                          {this.getDayOfWeek(info.dt)}
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

export default WeatherDaily;
