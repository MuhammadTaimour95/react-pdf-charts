import React, { Component, Children } from "react";
import moment from "moment";
import { Button, Typography } from "@material-ui/core";
import html2canvas from "html2canvas";
import pdfMake from "pdfmake/build/pdfmake";
import SimpleLineChart from "./simpleLineChart";
import LineChart from "./lineChart";
import DashsedLine from "./dashedLineChart";
import Container from "@material-ui/core/Container";
import BiaxialBarChart from "./biaxialBarChart";
import CustomShapedBarChart from './CustomShapeBarChart';
import BubbleChart from './BubbleChart';
import PieChart from './pieChart';
import RadarChart from './RadarChart';
import AreaChart from './areaChart';
import AreaBarChart from './areaandBarChart';

moment.locale("en");



class Chart extends Component {
  constructor(props) {
    super(props);
  }

  // Generate the pdf based on a component
  printToPdf = () => {
    html2canvas(document.getElementById("print_to_pdf")).then((canvas) => {
      var data = canvas.toDataURL();
      var pdfExportSetting = {
        content: [
          {
            image: data,
            width: 500,
          },
        ],
      };
      pdfMake.createPdf(pdfExportSetting).download("charts.pdf");
    });
  };

  ColoredDateCellWrapper = ({ children, value }) =>
    React.cloneElement(Children.only(children), {
      style: {
        ...children.style,
        backgroundColor: "red",
      },
    });

    state = { markerPosition: { lat: 49.8419, lng: 24.0315 } };
  moveMarker = () => {
    const { lat, lng } = this.state.markerPosition;
    this.setState({
      markerPosition: {
        lat: lat + 0.0001,
        lng: lng + 0.0001, 
      }
    });
  };

  render() {
    const { markerPosition } = this.state;
    return (
      <div>
        <Button onClick={this.printToPdf} variant="outlined">
          Export to PDF
        </Button>
        <br />
        <hr />
        <br />
        <br />
        <br />
        <br />
        <span
          id="print_to_pdf"
          style={{ alignItems: "center", margin: "0 auto" }}
        >
          <Container maxWidth="lg" align="center">
             <Typography variant="h5">Simple Line Chart</Typography>
            <br />

            <br />
            <SimpleLineChart />
            <br />

            <br />
            <Typography variant="h5">Single Line Chart</Typography>
            <br />

            <br />
            <LineChart />
            <br />

            <br />
            <Typography variant="h5">Dashed Line Chart</Typography>
            <br />

            <br />
            <DashsedLine /> 

            <br />

            <br />
            <Typography variant="h5">Biaxial Bar Chart</Typography>
            <br />

            <br />
            <BiaxialBarChart />
            <br />

            <br />
            <Typography variant="h5">Custom Shaped Bar Chart</Typography>
            <br />

            <br />
            <CustomShapedBarChart />
            <br />

            <br />
            <Typography variant="h5">Bubble Chart</Typography>
            <br />

            <br />
            <BubbleChart /> 
            <br />

            <br />
            <Typography variant="h5">Pie Chart</Typography>
            <br />

            <br />
            <PieChart />
            <br />

            <br />
            <Typography variant="h5">Radar Chart</Typography>
            <br />

            <br />
            <RadarChart />
            <br />

            <br />
            <Typography variant="h5">Area Chart</Typography>
            <br />
            <br />
            <AreaChart />
            <br />
            <br />
            <Typography variant="h5">Area And Bar Chart</Typography>
            <br />

            <br />
            <AreaBarChart />

          
          </Container>
        </span>
      </div>
    );
  }
}

export default Chart;
