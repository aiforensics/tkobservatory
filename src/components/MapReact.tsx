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

const geoUrl = "/features.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const MapChart = ({ setTooltipContent, onClickedCountry }: any) => {
  const [data, setData] = useState([]);

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

  return (
    <>
      <DateRange />
      <ComposableMap
        projection={projection}
        projectionConfig={{
          scale: 100,
        }}
      >
        {/* <Sphere stroke="#ff5233" strokeWidth={0.1} /> */}
        <ZoomableGroup center={[30, 60]} zoom={1.1}>
          {data.length > 0 && (
            <Geographies geography={geoUrl}>
              {({ geographies }: any) =>
                geographies.map((geo: any) => {
                  const d = data.find((s) => s["ISO3"] === geo.id);
                  console.log("geo", geo);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: { fill: "#06F" },
                        hover: { fill: "#ffdd19" },
                        pressed: { fill: "#aa0000" },
                      }}
                      // fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                      onMouseEnter={() => {
                        setTooltipContent(`${geo.properties.name}`);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      onClick={() => onClickedCountry(geo.properties)}
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
