import { useSelector } from "react-redux";
import { useStudentMap } from "../../../hooks/useStudentMap";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Box } from "@mui/material";

const MapBrowsing = () => {
  const { token, student } = useSelector((state) => state.student);
  const { data } = useStudentMap(student?.id, token);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const pushRoute = (id) => {
    window.open(`https://moalime.com/teacher/${id}`, "_blank");
  };

  return (
    <>
      {isLoaded && (
        <Box width="100%" height="100vh">
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
            center={{ lat: student?.lat, lng: student?.long }}
            zoom={10}
            options={{
              zoomControl: false,
              fullscreenControl: false,
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
            {data?.result?.map((teacher) => (
              <Marker
                key={teacher?.id}
                position={{ lat: teacher?.lat, lng: teacher?.long }}
                onClick={() => pushRoute(teacher.id)}
              />
            ))}
          </GoogleMap>
        </Box>
      )}
    </>
  );
};

export default MapBrowsing;
