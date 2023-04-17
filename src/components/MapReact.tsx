import { useEffect, useState, memo } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { geoPolyhedralWaterman } from "d3-geo-projection";
import { DateRange } from "./DateRange";
import { PatternLines } from "@vx/pattern";

const geoUrl = "/features.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const MapChart = ({ setTooltipContent, onClickedCountry }: any) => {
  const [data, setData] = useState([]);
  const [clickedCountry, setClickedCountry] = useState(false);

  const width = window.innerWidth * 0.7;
  const height = 600;
  let projection;
  projection = geoPolyhedralWaterman()
    .translate([width / 2, height / 2])
    .scale(140);

  useEffect(() => {
    csv(`/countries.csv`).then((data: any) => {
      setData(data);
    });
  }, []);

  const countryClicked = (props: any) => {
    setClickedCountry(props.name);
    onClickedCountry(props);
  };

  return (
    <>
      <DateRange />
      <ComposableMap
        projection={projection}
        projectionConfig={{
          scale: 100,
        }}
      >
        <PatternLines
          id="lines"
          height={2}
          width={2}
          stroke={"grey"}
          strokeWidth={0.5}
          orientation={["diagonal"]}
        />
        {/* <Sphere stroke="#ff5233" strokeWidth={0.1} /> */}
        <ZoomableGroup center={[30, 60]} zoom={1.1}>
          {data.length > 0 && (
            <Geographies geography={geoUrl} strokeWidth={0.5} stroke="#9cd2ff">
              {({ geographies }: any) =>
                geographies.map((geo: any) => {
                  const d = data.find((s) => s["ISO3"] === geo.id);
                  const availableCountry =
                    geo.properties && geo.properties.available;
                  const isClicked = clickedCountry === geo.properties.name;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      //  style={{ visibility: this.state.driverDetails.firstName != undefined? 'visible': 'hidden'}}

                      // fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                      fill={
                        !availableCountry
                          ? "url('#lines')"
                          : isClicked
                          ? "#ffdd19"
                          : "#06F"
                      }
                      style={{
                        // default: {
                        //   fill: availableCountry ? "#06F" : "#808080",
                        // },
                        hover: {
                          fill: availableCountry ? "#ffdd19" : "",
                        },
                      }}
                      onMouseEnter={() => {
                        setTooltipContent(
                          `${availableCountry ? geo.properties.name : ""}`
                        );
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      onClick={() =>
                        availableCountry && countryClicked(geo.properties)
                      }
                    />
                  );
                })
              }
            </Geographies>
          )}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
