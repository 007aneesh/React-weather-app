import { Component } from "react";
import React from "react";
import apiKeys from "./apiKeys";
import loader from "../images/loading.gif";
import Location from "./Location";
import { AiOutlineSearch } from "react-icons/ai";
class currentLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lon: null,
      errorMessage: "",
      temperatureC: undefined,
      temperatureF: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      icon: "CLEAR_DAY",
      aqi: undefined,
      cityName: undefined,
    };
  }
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        this.getWeather(
          position.coords.latitude,
          position.coords.longitude,
          null
        );
      },
      (err) => {
        this.setState({ errorMessage: err.message });
        console.log(err.message);
      }
    );
  }
  componentDidUpdate() {
    clearInterval(this.interval);
    this.handleSubmit = async (e) => {
      e.preventDefault();
      let ap = await fetch(
        `${apiKeys.base}weather?q=${this.state.cityName}&APPID=${apiKeys.key}`
      );
      let d3 = await ap.json();
      this.setState({ lat: d3.coord.lat, lon: d3.coord.lon });
      this.getWeather(this.state.lat, this.state.lon, this.state.cityName);
    };
  }
  getWeather = async (lat, lon, cityName) => {
    let api_call;
    if (cityName == null) {
      api_call = await fetch(
        `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
      );
    } else {
      api_call = await fetch(
        `${apiKeys.base}weather?q=${cityName}&units=metric&APPID=${apiKeys.key}`
      );
    }

    let aqi = await fetch(
      `${apiKeys.base}air_pollution?lat=${lat}&lon=${lon}&APPID=${apiKeys.key}`
    );
    let data = await api_call.json();
    let data1 = await aqi.json();
    this.setState({
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      humidity: data.main.humidity,
      main: data.weather[0].main,
      country: data.sys.country,
      wind: data.wind.speed,
      visibility: data.visibility,
      aqi: data1.list[0].main.aqi,
    });
    switch (this.state.main) {
      case "Haze":
        document.querySelector(".mainc").style.backgroundImage =
          "url('https://images.unsplash.com/36/STzPBJUsSza3mzUxiplj_DSC09775.JPG?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=max&w=1161&q=80')";
        break;
      case "Clouds":
        document.querySelector(".mainc").style.backgroundImage =
          "url('https://images.unsplash.com/photo-1593978301851-40c1849d47d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=max&w=1074&q=80')";
        break;
      case "Rain":
        document.querySelector(".mainc").style.backgroundImage =
          "url('https://images.unsplash.com/photo-1514277264166-8dc31e12b509?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=max&w=1440&q=80')";
        break;
      case "Snow":
        document.querySelector(".mainc").style.backgroundImage =
          "url('https://images.unsplash.com/photo-1566995290940-0ee390b86baa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=max&w=1332&q=80')";
        break;
      case "Dust":
        document.querySelector(".mainc").style.backgroundImage =
          "url('https://images.unsplash.com/photo-1579003593419-98f949b9398f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=max&w=1173&q=80')";
        break;
      case "Drizzle":
        document.querySelector(".mainc").style.backgroundImage =
          "url('https://images.unsplash.com/photo-1514277264166-8dc31e12b509?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=max&w=1074&q=80')";
        break;
      case "Fog":
        document.querySelector(".mainc").style.backgroundImage =
          "url('https://images.unsplash.com/photo-1482841628122-9080d44bb807?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=max&w=1171&q=80')";
        break;
      case "Smoke":
        document.querySelector(".mainc").style.backgroundImage =
          "url('https://images.unsplash.com/photo-1637443719654-04e839df3aa0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=max&w=1331&q=80')";
        break;
      case "Tornado":
        document.querySelector(".mainc").style.backgroundImage =
          "url('https://images.unsplash.com/photo-1594480464691-7d223cab32b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=max&w=1074&q=80')";
        break;
      default:
        document.querySelector(".mainc").style.backgroundImage =
          "url('https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=max&w=1074&q=80')";
    }
  };
  // handleSubmit = async (e) => {
  //   e.preventDefault();
  //   let ap = await fetch(
  //     `${apiKeys.base}weather?q=${this.state.cityName}&APPID=${apiKeys.key}`
  //   );
  //   let d3 = await ap.json();
  //   this.setState({ lat: d3.coord.lat, lon: d3.coord.lon });
  //   this.getWeather(this.state.lat, this.state.lon, this.state.cityName);
  // };
  renderContent() {
    if (!this.state.errorMessage && this.state.lat) {
      return (
        <React.Fragment>
          <div className="container mx-auto p-10 lg:w-7/12 lg:p-5">
            <form
              className="flex items-center flex-col"
              onSubmit={this.handleSubmit}
            >
              <div className="w-10/12 md:w-7/12 lg:w-7/12 flex flex-row items-center rounded-full h-full bg-white/60 text-black">
                <input
                  type="text"
                  className="text-black w-10/12 md:w-11/12 flex flex-row h-10 bg-white/0 outline-none p-4 rounded-full placeholder:text-slate-500"
                  placeholder="Search"
                  value={this.state.cityName}
                  onChange={(e) => this.setState({ cityName: e.target.value })}
                />
                <button onClick={this.handleSubmit}>
                  <AiOutlineSearch className="text-slate-500" />
                </button>
              </div>
            </form>
          </div>
          <Location
            latitude={this.state.lat}
            longitude={this.state.lon}
            main={this.state.main}
            city={this.state.city}
            tempC={this.state.temperatureC}
            tempF={this.state.temperatureF}
            humidity={this.state.humidity}
            country={this.state.country}
            wind={this.state.wind}
            visibility={this.state.visibility}
            aqi={this.state.aqi}
          />
        </React.Fragment>
      );
    }
    return (
      <div className="mt-[10vh] lg:mt-0">
        <img
          src={loader}
          alt="loading"
          className=" w-full md:w-auto "
          style={{ WebkitUserDrag: "none" }}
        />
        <h3
          className="text-2xl md:text-4xl"
          style={{ color: "white", fontWeight: "600" }}
        >
          Detecting your location
        </h3>
        <h3
          className="text-lg md:text-2xl"
          style={{ color: "white", marginTop: "10px" }}
        >
          Your current location wil be displayed on the App <br></br> & used for
          calculating Real time weather.
        </h3>
      </div>
    );
  }
  render() {
    return (
      <div className=" h-full w-full bg-black/20 bg-no-repeat">
        <div className="flex flex-col items-center  h-full ">
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

export default currentLocation;
