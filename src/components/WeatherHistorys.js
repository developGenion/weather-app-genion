import React, { Component } from "react";
import axios from 'axios';
import Cookies from "js-cookie";
import Slider from "react-slick";
import { format } from 'date-fns';
import { tr } from "date-fns/locale";


class WeatherHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherHistory: null,
      isDefault: true
    };
  }

  async componentDidUpdate(prevProps) {
    console.log(prevProps.isDefault)
    const existingSessionId = Cookies.get("ssesion_id");
    if (existingSessionId && prevProps.isDefault) {
     const response = await  fetch(`http://127.0.0.1:5000/history?session=${existingSessionId}`, {
      method: "GET",
    })
    console.log(response)
    if (response.ok) {
      const result = await response.json();
      this.setState({ weatherHistory: result });
    }
  }
}

  getCurrentDate = (date) => {
    const currentDate = new Date(date);
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('en-US', { month: 'long' });
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${formattedDay} ${month}`;
  };


  getCurrentHours = (date) => {
    const fecha = new Date(date);
    // Utiliza date-fns para formatear la hora en formato de 12 horas (AM/PM)
    const horaFormateada = format(fecha, 'hh:mm a');
    return horaFormateada
  };
  
  
  obtenerIcono(clima) {
    const today = clima.substring(2);
    switch (today) {
      case "d":
        const code = clima.substring(0, 2);
        switch (code) {
          case "01":
            return <img src="./assets/media/icon/sun-icon-big.png" alt="" />;
          case "02":
            return <i className="fas fa-cloud-sun" />
          case "03":
            return <i class="fad fa-cloud" />
          case "04":
            return <i class="fad fa-cloud" />
          case "09":
            return <i class="fas fa-cloud-showers" />
          case "10":
            return <i class="fad fa-cloud-sun-rain" />
          case "11":
            return <i class="fa-solid fa-cloud-bolt" />
        }
      case "n":
        const code_n = clima.substring(0, 2);
        switch (code_n) {
          case "01":
            return <i className="fas fa-moon" />;
          case "02":
            return <i class="fa-solid fa-cloud-moon" />;
          case "03":
            return <i class="fad fa-cloud" />
          case "04":
            return <i class="fad fa-cloud" />
          case "09":
            return <i class="fas fa-cloud-showers" />
          case "10":
            return <i class="fad fa-cloud-moon-rain" />
          case "11":
            return <i class="fa-solid fa-cloud-bolt" />
        }
        return <i className="fad fa-cloud" />;
      default:
        return null;
    }
  }
  render() {
    const { weatherHistory } = this.state
    const settings = {
      infinite: false, // Hace que el slider sea infinito
      slidesToShow: 4, // Número de contenedores visibles a la vez
      slidesToScroll: 1, // Número de contenedores para desplazarse a la vez
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1, // Cambia a 1 contenedor visible en pantallas pequeñas
          },
        },
      ],
    };
    return (
      <section className="recent pt-100">
        <div className="container">
          <div className="title text-center">
            <h2 className="fw-5 fs-40 lh-120 ls-5 color-dark mb-16">
              Recent Search Weather
            </h2>
            <p className="fw-4 fs-16 lh-160 ls-2 color-gray mb-48">
            Review your recent weather searches in one convenient place. Quickly access past forecasts, stay organized, and plan ahead with ease.
            </p>
          </div>
          <div className="recent-slider slick-initialized slick-slider">
         
            {weatherHistory === null ? (
              <div className="slick-list draggable" style={{ padding: 0 }}></div>
            ) : (
             
                <Slider {...settings}>
                  {weatherHistory &&
                  weatherHistory.length > 0 &&
                  weatherHistory.map((info, index) => (
                   
                    <div className="content" id="cont-historys">
                      <div className="slider-block block-1 slick-slide slick-cloned" data-slick-index={0} id="conten-slider-Wth" aria-hidden="true"
                      tabIndex={0} >
                      <div className="content">
                      <h4>{this.getCurrentDate(info.date_time)}</h4>
                      {this.obtenerIcono(info.icon)}
                        <p className="">{info.temp}°</p>
                        <h4>{info.description}</h4>
                        <h2>{info.city}</h2>
                        <h4>{this.getCurrentHours(info.date_time)}</h4>
                      </div>
                    </div>
                    </div>
                  ))}
                </Slider>
        
            )}

          </div>
        </div>
      </section>
    );
  }
}

export default WeatherHistory;
