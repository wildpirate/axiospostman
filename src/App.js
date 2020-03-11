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

  ask_call = (url, data) =>
    axios
      .post(this.url + url, data, {
        headers: { Authorization: "Token " + this.state.token }
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          ...this.state,
          results: [...this.state.results, response.data]
        });
      });

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

  createTimetableRecords = () =>
    axios
      .post(
        this.url + "timetable/create_timetable_records/",
        { key: "name", period: [90023, 101231], name: "asd", note: "test" },
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

  askForTimetable = () =>
    axios
      .post(
        this.url + "timetable/get_timetable/",
        { key: "name", period: [1000, 200000] },
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
        <button onClick={this.createTimetableRecords}>create timetable</button>
        <button onClick={this.askForTimetable}>ask for timetable</button>
        <button
          onClick={() =>
            this.ask_call("template_app/functionality_a/", { arg1: 1, arg2: 2 })
          }
        >
          template_App_fuinca
        </button>
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
