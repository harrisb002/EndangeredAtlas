import { useEffect, useState } from "react";
import styled from "styled-components";

import {
  ComposableMap, // Actually mapes the map for you
  Geographies, // Countains the logic for the shapes of the countries (Huge JSON file basically)
  Geography, // Same as above but for particular one
  Annotation, // Used to write onto screen
  ZoomableGroup, // Obviously for zooming into countires
} from "react-simple-maps";

//Used for decifering how the colors are going to be rendered on map according to the data
import { scaleLinear } from "d3-scale";
import { geoAlbersUsa } from "d3-geo";

//Styled Components
// Half the viewport(size of screen) width & height
const StyledMap = styled.div`
  width: 100vw;
  height: 80vh;
`;

const LegendOverlay = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background: rgba(173, 216, 230, 0.8); /* light blue */
  padding: 10px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;

  .legend .bar {
    height: 10px;
    width: 100%;
    background: linear-gradient(to right, #76e084, #0d7239);
  }

  input {
    background-color: transparent;
    display: inline-block;
    width: 100%;
    position: relative;
    margin: 0;
    cursor: ew-resize;
  }
`;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//Inital layout of the world map (Basically JSON file for the topology)
const geoURL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Domain used declaring the "min and max" for the data (closer to min is lighter, closer to max is darker)
//const colorScale = scaleLinear().domain([0, 400]).range(["#33c481", "#0d7239"]);

const Map = () => {
  //Define the states
  const [states, setStates] = useState([]);

  //Define the mallard data
  const [mallards, setMallards] = useState([]);

  //Set the value to be used for the zoom quantity cordinates to be centered on screen
  const [position, setPosition] = useState({ coordinates: [-97, 40], zoom: 1 }); // center it roughly on the USA

  // Used to hold the "state" of the current month
  const [currentMonth, setCurrentMonth] = useState(0);

  // Added "state" to store clicked on states details
  const [selectedState, setSelectedState] = useState(null);

  //Function used to handle when the user stops moving on screen and to repostion
  const handleMoveEnd = (postion) => {
    setPosition(position);
  };

  //Function used to handle when the user clicks a state
  const handleSelectedState = (geo) => {
    setSelectedState({
      name: geo.properties.name,
      coordinates: geo.properties.centroid,
    });
  };

  //Function to make call to the JSON server API (function created not invoked, needs useEffect)
  const getData = () => {
    //Fecthes Connection string to the db.json connection string
    //Second arguemnet is for options, i.e. header, params, ect...
    fetch("http://localhost:3001/states", {
      header: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      //Set states to the new data
      .then((data) => {
        setStates(data);
      });
  };

  //Function to make call to the JSON server API (function created not invoked, needs useEffect)
  const getMallardData = () => {
    //Fecthes Connection string to the db.json connection string
    //Second arguemnet is for options, i.e. header, params, ect...
    fetch("http://localhost:3001/mallards", {
      header: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      //Set states to the new data
      .then((data) => {
        setMallards(data);
      });
  };

  const filterBy = (month) => {
    setCurrentMonth(month);
    // Need to integrate the filtering logic for population densities
  };

  //Using useEffect hook so it is loaded imm. to DOM (not on a particular event)
  useEffect(() => {
    getData();
    getMallardData();
  }, []); //2nd arguement for dependencies

  // Derived state for the total number of mallards
  const totalMallards = mallards.reduce((acc, event) => acc + event.Number, 0);

  // Update the color scale domain based on the totalMallards
  const colorScale = scaleLinear()
    .domain([0, totalMallards])
    .range(["#33c481", "#0d7239"]);

  return (
    <StyledMap>
      <LegendOverlay className="map-overlay top">
        <div className="map-overlay-inner">
          <h2>Population densities in 2023</h2>
          <label id="month">{months[currentMonth]}</label>
          <input
            id="slider"
            type="range"
            min="0"
            max="11"
            step="1"
            value={currentMonth}
            onChange={(e) => filterBy(Number(e.target.value))}
          />
        </div>
        <div className="map-overlay-inner">
          <div id="legend" className="legend">
            <div className="bar"></div>
            <div>Density</div>
          </div>
        </div>
      </LegendOverlay>
      <ComposableMap
        projection={geoAlbersUsa()}
        projectionConfig={{ scale: 1000 }} // Adjust as needed for scaling the map
      >
        {states.length > 0 ? (
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMouseMove={handleMoveEnd}
          >
            <Geographies geography={geoURL}>
              {({ geographies }) =>
                geographies.map((geo, index) => {
                  const state = states.find(
                    (s) => s.name === geo.properties.name
                  );
                  // Adjusted the color logic
                  let fillColor = colorScale(0); // default light green color for states with no data
                  if (state) {
                    fillColor =
                      geo.properties.name === "California"
                        ? colorScale(totalMallards)
                        : fillColor;
                  }
                  return (
                    <Geography
                      key={index}
                      geography={geo}
                      fill={fillColor}
                      onClick={() => handleSelectedState(geo)}
                    />
                  );
                })
              }
            </Geographies>
            {/* {selectedState && ( // Conditionally render the annotation based upon if a state has been clicked upon
              <Annotation subject={selectedState.coordinates} dx={-30} dy={-30}>
                <circle cx={4} cy={4} r={4} fill="#FF5733" stroke="#DF3700" />
                <text
                  x={4}
                  y={4}
                  dy={-15}
                  style={{ fontSize: 10, fontWeight: "bold", fill: "#333" }}
                >
                  {selectedState.name}
                </text>
              </Annotation>
            )} */}
          </ZoomableGroup>
        ) : (
          <></>
        )}
      </ComposableMap>
    </StyledMap>
  );
};

export default Map;
