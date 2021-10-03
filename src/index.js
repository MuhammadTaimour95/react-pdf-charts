import React, { Component } from "react";
import { render } from "react-dom";
import styled from "styled-components";
import Calendar from "./Charts";

import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

class App extends Component {

  render() {
    return (
      <div style={{alignItems: "center"}}>
        <Calendar />
      </div>
    );
  }
}

const WithDnd = DragDropContext(HTML5Backend)(App);

render(<WithDnd />, document.getElementById("root"));
