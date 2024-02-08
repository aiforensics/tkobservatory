import { useApiGet } from "./hooks/useApiHook";
import { VIDEOS_REQUESTED } from "./constants";

// Passing dates as a 2nd parameter to the hook to trigger the useeffect inside for every dates change
function useAPIGetTopByCountry(dates: Date[]) {
  return useApiGet(
    `${
      process.env.REACT_APP_TOP_COUNTRY_API
    }?start=${dates[0].toISOString()}&end=${dates[1].toISOString()}&n=${VIDEOS_REQUESTED}`,
    dates
  );
}

function useAPIGetGlobalRecommendations(dates: Date[]) {
  return useApiGet(
    `${
      process.env.REACT_APP_GLOBAL_RECOMMENDATIONS_API
    }?start=${dates[0].toISOString()}&end=${dates[1].toISOString()}&n=${VIDEOS_REQUESTED}`,
    dates
  );
}

export { useAPIGetTopByCountry, useAPIGetGlobalRecommendations };
