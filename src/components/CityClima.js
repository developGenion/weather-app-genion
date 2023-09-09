import React, { Component } from "react";
import { v5 as uuidv5 } from 'uuid';
import axios from 'axios';
import Cookies from "js-cookie";


class CiudadClima extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datosCiudad: null,
      inputValue: "",
      weather: null,
      name_city: "",
      currentDate: this.getCurrentDate(),
      modoOscuro: false,
      selected: false,
      ipAddress: null, 
      uuid: null,
      favorite: false,
    };
  }
  componentWillMount() {
    this.verificarHoraYActivarModoOscuro();
    const existingSessionId = Cookies.get("ssesion_id");
    if (existingSessionId) {
      this.SessionUser(existingSessionId)
    }else{
      axios.get('https://api.ipify.org?format=json')
      .then(async (response) => {
        const ipAddress = response.data.ip;
        const uuid = uuidv5(ipAddress, uuidv5.DNS);
        this.setState({ ipAddress, uuid });
        Cookies.set("ssesion_id", uuid, { expires: 7 });
        this.SessionUser(uuid)
      })
      .catch((error) => {
        console.error('Error al obtener la dirección IP:', error);
      });      
    } 
  }
 

  async SessionUser(id){
    const formdataUser = {
      ssesion_id: id
    }
    const response = await fetch("http://127.0.0.1:5000/user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formdataUser)
    })
    if (response.ok) {
      const responseData = await response.json();
      if ( responseData.user_city.length > 0) {
        const user_city = responseData.user_city;
        for (let i=0; i < user_city.length; i++) {
          const element = user_city[i];        
          let lat = element.my_city.lat
          let name = element.my_city.city
          let lon = element.my_city.lon
          let status = true
          this.handleSpanClick(lat, lon, name, status)
          Cookies.set("_lat", lat, { expires: 7 });
          Cookies.set("_lon", lon, { expires: 7 });
          this.state.selected = true
          this.state.favorite = true
        }
       
      }else{
        console.log("3")
      }

    }else{
      console.log("mal")
    }

  }

  verificarHoraYActivarModoOscuro = () => {
    const horaActual = new Date().getHours();
    if (horaActual >= 18) {
      this.setState({ modoOscuro: true }, () => {
        document.body.classList.add("dark");
      });
    }
  };

  getCurrentDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('en-US', { month: 'long' });
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${formattedDay} ${month}`;
  };
  handleInputChange = (event) => {
    if (this.inputTimer) {
      clearTimeout(this.inputTimer);
    }

    const inputValue = event.target.value;
    this.inputTimer = setTimeout(() => {
      this.setState({ inputValue }, () => {
        // Llama a fetchData después del retraso
        this.fetchData();
      });
    }, 100);
  };

  fetchData = () => {
    const { inputValue } = this.state;
    if (!inputValue) {
      this.setState({ datosCiudad: "" });
      return;
    }

    fetch(`http://127.0.0.1:5000/city?city=${inputValue}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no se completó correctamente");
        }
        return response.json();
      })
      .then((result) => {
        this.setState({ datosCiudad: result });
      })
      .catch((error) => {
        console.error("Error de solicitud:", error);
      });
  };

  obtenerFechaHoraActual() {
    const fechaHoraActual = new Date();
    return fechaHoraActual.toISOString(); // Devuelve la fecha y hora en formato ISO8601
  }
  updateIsDataFetched = (value) => {
    this.setState({ isDataFetched: value });
  };


  historySave(info, name){
    const date_time = this.obtenerFechaHoraActual()
    const ssesion = Cookies.get("ssesion_id");
    const temp = Math.round(info.current.temp)
    const city = name
    const description = info.current.weather[0].description
    const icon = info.current.weather[0].icon
    const data = {
      date_time,
      temp,
      city,
      description,
      icon,
      ssesion
    }
    fetch("http://127.0.0.1:5000/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((result) => {
      if(result){

        console.log("###")
      }
    })

  }

  handleSpanClick = (lat, lon, name, status=false) => {
    const _lat = Cookies.get("_lat");
    const _lon = Cookies.get("_lon");
    fetch("http://127.0.0.1:5000/clima", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lat, lon }),
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({ weather: result });
        this.setState({name_city: name})
        this.props.onWeatherDataUpdate(result, name);
        this.setState({ datosCiudad: "" });
        this.setState({ inputValue: "" });
        if(status){
          setTimeout(() => {
              this.addFvorite(lat, lon, name);
          }, 1500)
        }else{
          this.historySave(result, name)
          if(this.state.favorite == false){
            setTimeout(() => {
              this.addFvorite(lat, lon, name);
          }, 1500)
          }
          else{
            if(_lat != lat && _lon != lon){
              this.setState({ selected:false });
            }
          }
          
        }
       

      });
  };

  addFvorite(lat, lon, name=null){
    if (this.state.selected == false && this.state.favorite) {  //"If the field I select is not the favorite and there is a favorite saved.
      let text = "Do you want to update your favorite?";
      if(window.confirm(text) == true) {
        const session = Cookies.get("ssesion_id");
        let in_lat = String(lat)
        let in_lon = String(lon)
        fetch("http://127.0.0.1:5000/my_favorite", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, in_lat, in_lon, session }),
            })
            .then((response) => response.json())
            .then((result) =>{
                window.location.reload()
            }) 
      }
      else{
        return
      }
    }
    if (!this.state.selected && !this.state.favorite) {
      let text = "Do you want to add this city as a favorite?";
      if(window.confirm(text) == true) {
        const session = Cookies.get("ssesion_id");
        let in_lat = String(lat)
        let in_lon = String(lon)
        fetch("http://127.0.0.1:5000/my_favorite", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, in_lat, in_lon, session }),
            })
            .then((response) => response.json())
            .then((result) =>{
                window.location.reload()
            }) 
      }
      else{
        return
      }
    }else{
      return
    }

  }
  render() {
    const { datosCiudad, inputValue, weather, name_city, currentDate, modoOscuro, selected  } = this.state;
    
    return (
      <section className="weather-banner-2">
 
        <div className="container">
          <div className="content">
            <div className="row justify-content-between">
              <div className="col-xl-8 col-lg-6 mb-lg-0 mb-4">
                <div className="text">
                  <h5 className="fw-4 fs-23">Weather and Forecast </h5>
                  <h2 className="fw-4 lh-120">
                    Daily Weather Forecast <br></br> Update News
                  </h2>
                  <p className="fs-19 fw-5 lh-150 bottom-space pt-0">
                    Get the latest weather forecast for today with up-to-date{" "}
                    <br /> information on temperature, precipitation, and more.
                  </p>
                  <div className="col-xl-9">
                    <form action="">
                      <div className="input-group m-0">
                        <input
                          type="text"
                          className="form-control"
                          id="search"
                          name="search"
                          onChange={this.handleInputChange}
                          required
                          placeholder="Search for location..."
                        />
                      </div>
                    </form>
                    <div className="cont-princi">
                      {datosCiudad && datosCiudad.list.length > 0 && (
                        <ul id="add-list" className="list-contes">
                          {datosCiudad.list.map((ciudad) => (
                            <li key={ciudad.id} className="span-hovers">
                              <span
                                className="span-widt"
                                onClick={() =>
                                  this.handleSpanClick(
                                    ciudad.coord.lat,
                                    ciudad.coord.lon,
                                    ciudad.name + ", " + ciudad.sys.country
                                  )
                                }
                              >
                                {ciudad.name}, {ciudad.sys.country}
                                <img
                                  src={`https://openweathermap.org/images/flags/${ciudad.sys.country.toLowerCase()}.png`}
                                  alt="Flag"
                                  className="flag"
                                />
                              </span>
                              <span>
                                {Math.round(ciudad.main.temp - 273.15)}°C
                                <img
                                  src={`https://openweathermap.org/img/wn/${ciudad.weather[0].icon}.png`}
                                  alt="Weather Icon"
                                />
                              </span>
                              <span className="sub-cords">
                                {ciudad.coord.lat}, {ciudad.coord.lon}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 ">
                <div className="detail p-100 text-center">
                {weather === null ? (
                  <div id="text-select-weateher">
                    <p>Choose a city to inquire about</p>
                  </div>
                ) : (
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-32 city-detail">
                    <a href="#" data-value="1" onClick={() =>this.addFvorite(weather.lat,weather.lon, this.state.name_city)} title="Add favorite"  className={`star-icon ${this.state.selected ? "selected" : ""}`}>
                      &#9733;
                      {this.state.selected ? (
                        <span id="text-favorite" ></span>
                      ): (
                        <span id="text-favorite" >Add favorite</span>
                        
                        )}
                    </a>
                      <h4 className="fw-6 color-dark m-0">{name_city}</h4>
                      <img src={`./assets/media/icon/${weather.current.weather[0].icon}.png`} alt="" />
                    </div>
                    <h5 className="fw-5 fs-23 color-dark">Today, {currentDate}</h5>
                    <h2 className="fw-6 fs-95 lh-120 color-dark m-0">
                    {Math.round(weather.current.temp)}°C 
                    </h2>
                    <p className="fw-6 mb-32 color-dark">{weather.current.weather[0].description}</p>
                    <div className="d-flex align-items-center justify-content-center mb-24">
                      <span className="color-dark text-end">{weather.current.wind_speed.toFixed(1)} m/s</span>
                      <span className="color-dark text-start">Wind</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="color-dark text-end">Hum</span>
                      <span className="color-dark text-start">{weather.current.humidity}%</span>
                    </div>
                  </div>
                )}
       
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CiudadClima;
