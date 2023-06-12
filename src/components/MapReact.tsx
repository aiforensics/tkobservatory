import { useEffect, useState, memo, useMemo } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { geoPolyhedralWaterman, geoAugust } from "d3-geo-projection";
import { PatternLines } from "@vx/pattern";
import { INITIAL_LOCATION } from "./../constants";

const geoUrl = "/features.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const MapChart = ({
  setTooltipContent,
  onClickedCountry,
  countryInfo,
  countriesClickedGlobal,
  clearCountriesGlobal,
}: any) => {
  const initialZoomCoor = useMemo(() => {
    return {
      coord: [30, 60],
      zoom: 0.6,
    };
  }, []);

  const [data, setData] = useState([]);
  const [center, setCenter] = useState(initialZoomCoor.coord);
  const [zoom, setZoom] = useState(initialZoomCoor.zoom);
  const [country, setCountry] = useState("");

  const width = window.innerWidth * 0.7;
  const height = 600;
  let projection;
  projection = geoAugust()
    .translate([width / 2, height / 2.8])
    .scale(130);

  useEffect(() => {
    csv(`/countries.csv`).then((data: any) => {
      setData(data);
    });
  }, []);

  useEffect(() => {
    const cleanMap = () => {
      setCenter(initialZoomCoor.coord);
      setZoom(initialZoomCoor.zoom);
      setCountry("");
    };

    if (countryInfo.name === INITIAL_LOCATION) cleanMap();
  }, [countryInfo, initialZoomCoor]);

  const countryClicked = (props: any) => {
    clearCountriesGlobal();
    setCountry(props.name);
    onClickedCountry(props);
  };

  const saveMapView = (center: any, zoom: any) => {
    setCenter(center);
    setZoom(zoom);
  };

  return (
    <>
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
        <ZoomableGroup
          center={center}
          zoom={zoom}
          onMoveEnd={({ coordinates, zoom }: any) => {
            saveMapView(coordinates, zoom);
          }}
        >
          {data && data.length > 0 && (
            <Geographies geography={geoUrl} strokeWidth={1} stroke="#000">
              {({ geographies }: any) =>
                geographies.length &&
                geographies.map((geo: any) => {
                  // const d = data.find((s) => s["ISO3"] === geo.id);
                  const availableCountry =
                    geo.properties && geo.properties.available;
                  const isClicked = country === geo.properties.name;

                  const foundcountriesClickedGlobalFound =
                    countriesClickedGlobal &&
                    countriesClickedGlobal.find((element: string) => {
                      if (element === geo.id) {
                      }
                      return element === geo.id;
                    });

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      // style={{
                      //   visibility:
                      //     this.state.driverDetails.firstName != undefined
                      //       ? "visible"
                      //       : "hidden",
                      // }}
                      // fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                      fill={
                        !availableCountry
                          ? "url('#lines')"
                          : foundcountriesClickedGlobalFound
                          ? "#511281"
                          : isClicked
                          ? "#ffdd19"
                          : "#FFF"
                      }
                      style={{
                        // default: {
                        //   fill: availableCountry ? "#06F" : "#808080",
                        // },
                        hover: {
                          fill: availableCountry ? "#fdf1ab" : "",
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
