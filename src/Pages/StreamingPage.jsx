import React, { Component } from "react";
import io from "socket.io-client";
import Helpers from "../Helpers";
import axios from "axios";

class SreamingPage extends Component {
  state = {};
  componentDidMount() {
    const socket = io.connect(Helpers.getBackendLink() + "/streams/stream");
    this.setState({ socket: socket });
    document.title = "Streaming";
  }
  startStreaming = async () => {
    const sd = await axios.get("/api/streaming/stream/55454");
    console.log(sd.data.toString());
    this.vdd.src = sd.data;
  };
  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <video
            ref={(ref) => (this.vdd = ref)}
            controls
            style={{ width: "1200px", height: "100%", margin: "0 auto" }}
          ></video>
          <div>
            <button onClick={this.startStreaming}>Start</button>
          </div>
          <label htmlFor="tt">audio</label>
          <input type="checkbox" id="tt" />
          <label htmlFor="tt">cursor</label>
          <input type="checkbox" id="tt" />
          <label htmlFor="tt">Type</label>
          <input type="checkbox" id="tt" />
          <input type="file" ref={(ref) => (this.viinput = ref)} />
        </div>
        <video
          ref={(ref) => (this.svdd = ref)}
          controls
          style={{ width: "1200px", height: "100%", margin: "0 auto" }}
        ></video>
      </div>
    );
  }
}

export default SreamingPage;
