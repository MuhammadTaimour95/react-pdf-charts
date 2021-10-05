import React, { useState, useEffect } from "react";
import { Map, TileLayer, withLeaflet } from "react-leaflet";
import data from "../assets/data.json";
import Markers from "./VenueMarkers";
import html2canvas from "html2canvas";
import pdfMake from "pdfmake/build/pdfmake";
import PrintControlDefault from 'react-leaflet-easyprint';
import domtoimage from 'dom-to-image';

import { useLocation, useHistory } from "react-router-dom";

import "leaflet/dist/leaflet.css";
import { Button } from "@material-ui/core";

const MapView = (props) => {
  const [state, setState] = useState({
    currentLocation: { lat: 52.52437, lng: 13.41053 },
    zoom: 13,
    data,
  });

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.state.latitude && location.state.longitude) {
      const currentLocation = {
        lat: location.state.latitude,
        lng: location.state.longitude,
      };
      console.log(state);
      setState({
        ...state,
        data: {
          venues: state.data.venues.concat({
            name: "new",
            geometry: [currentLocation.lat, currentLocation.lng],
          }),
        },
        currentLocation,
      });
      history.replace({
        pathname: "/map",
        state: {},
      });
    }
  }, [history, location, state]);

  // Generate the pdf based on a component
  function printToPdf()  {
    var node = document.getElementById('print_to_pdf');
    domtoimage
  .toPng(node)
  .then(dataUrl => {
    //pass dataUrl to reactpdf document here

    var img = new Image();
        img.src = dataUrl;
    var pdfExportSetting = {
            content: [
              {
                image: dataUrl,
                width: 500,
              },
            ],
          };
          pdfMake.createPdf(pdfExportSetting).download("charts.pdf");
  })
  .catch(err => console.log("to img err", err));
  };
 
  return (
    <div>
        <Button 
    onClick={() => printToPdf()} 
    variant="outlined">
          Export to PDF
      </Button>
      <span
          
          style={{ alignItems: "center", margin: "0 auto" }}
        >
    <Map center={state.currentLocation} zoom={state.zoom} id="print_to_pdf">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Markers venues={state.data.venues} />
    </Map>


    </span>
    </div>
  );
};

export default MapView;
