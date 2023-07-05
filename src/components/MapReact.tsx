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
import MapControls from "./../components/MapControls";

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
      coord: [0, 0],
      zoom: 1,
    };
  }, []);

  const [data, setData] = useState([]);
  const [center, setCenter] = useState(initialZoomCoor.coord);
  const [zoom, setZoom] = useState(initialZoomCoor.zoom);
  const [country, setCountry] = useState("");

  let projection = geoAugust().translate([400, 300]).scale(60);

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
    console.log("saeeve");
    setCenter(center);
    setZoom(zoom);
  };

  const handleZoomIn = () => {
    var rect = document.querySelector(".rsm-svg rect");
    var rectSize = rect!.getBoundingClientRect();
    var event = new MouseEvent("dblclick", {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: rectSize.width / 2,
      clientY: rectSize.height / 2,
    });
    rect!.dispatchEvent(event);
  };

  const handleZoomOut = () => {
    if (zoom <= 1) return;
    setZoom(zoom / 2);
  };

  return (
    <>
      <MapControls handleZoomIn={handleZoomIn} handleZoomOut={handleZoomOut} />
      <ComposableMap
        projection={projection}
        projectionConfig={{
          scale: 130,
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
          filterZoomEvent={(evt: any) => {
            return true;
          }}
          center={center}
          zoom={zoom}
          onMoveEnd={({ coordinates, zoom }: any) => {
            saveMapView(coordinates, zoom);
          }}
        >
          {data && data.length > 0 && (
            <Geographies geography={geoUrl} strokeWidth={0.5} stroke="#000">
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
                          ? "#945cb4"
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
