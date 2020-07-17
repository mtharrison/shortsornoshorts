import Axios from 'axios'
import React, { Component } from 'react'
import './App.css'

const shortsThreshold = 19.0;

const messages = {
  loading: 'loading temperature data',
  shorts: 'looks like shorts to me',
  noshorts: 'brr, maybe not today',
  error: 'not sure where you are, maybe flip a coin?'
};

export default class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = { status: 'loading', tick: 0 }

    setInterval(() => {
      this.setState({ tick: (this.state.tick + 1) % 4})
    }, 200);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.onLocation(position);
      });
    } else {
      this.setState({ status: 'error' });
    }
  }

  async onLocation(location) {
    const { latitude, longitude } = location.coords;
    const res = await Axios.get(`/temp?lat=${latitude}&lng=${longitude}`);
    const temp = parseInt(res.data.temp);

    this.setState({
      status: temp >= shortsThreshold ? 'shorts' : 'noshorts',
      temp: temp
    });
  }
  
  render() {
    let message;

    if (this.state.status === 'loading') {
      message = <h1>{messages[this.state.status]}{'.'.repeat(this.state.tick)}</h1>;
    }
    else {
      message = <h1>{this.state.temp}°c <br></br> {messages[this.state.status]}</h1>;
    }

    return (
      <div className={this.state.status}>{message}</div>
    );
  }
}
  