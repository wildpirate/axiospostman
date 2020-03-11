import React from "react";
import "./styles.css";
import axios from "axios";
import ReactJson from "react-json-view";

class App extends React.Component {
  state = {
    token: "",
    results: []
  };

  url = "http://127.0.0.1:8000/";

  getToken = () =>
    axios
      .post(this.url + "api-token-auth/", {
        username: "admin",
        password: "Admin123!"
      })
      .then(response => {
        this.setState({ ...this.state, token: response.data.token });
      })
      .catch(e => alert(e));

  askForTimetable = () =>
    axios
      .post(
        this.url + "timetable/get_timetable/",
        { key: "name", period: [100223, 100231] },
        {
          headers: { Authorization: "Token " + this.state.token }
        }
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          ...this.state,
          results: [...this.state.results, response.data]
        });
      });

  render = () => {
    return (
      <div className="App">
        <button onClick={this.getToken}>auth</button>
        <button onClick={this.askForTimetable}>ask for timetable</button>
        <p>token: {this.state.token}</p>
        {this.state.results.map((r, i) => (
          <div key={i} style={{ width: "100%", height: 200 }}>
            <ReactJson src={r} />
          </div>
        ))}
      </div>
    );
  };
}

export default App;
