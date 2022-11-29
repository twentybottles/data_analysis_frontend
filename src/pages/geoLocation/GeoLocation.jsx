import React, { useEffect, useState } from 'react';
import "./geoLocation.css";
import carImg from './car.svg';
import bikeImg from './bike.svg';
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

export default function GeoLocation() {

  const [showingMarkerWindow, setshowingMarkerWindow] = useState(false);
  const [showingIconWindow, setShowingIconWindow] = useState(false);
  const [trafficData, setTrafficData] = useState([]);
  const [envData, setEnvData] = useState([]);
  const [searchFlg, setSearchFlg] = useState(false);
  const [mapref, setMapRef] = React.useState(null);
  const [center, setCenter] = React.useState({lat: 35.69575, lng: 155.77521});
  const [sensorName, setSensorName] = useState([]);
  const [positionInfoWindow, setPositionInfoWindow] = useState([]);
  const [deviceUser, setDeviceUser] = useState([]);
  const [deviceType, setDeviceType] = useState([]);
  const [deviceSpeed, setDeviceSpeed] = useState([]);
  
  const divStyle = {
    background: "white",
    fontSize: 12,
    width : 120,
    height : 280
  };

  const containerStyle = {
    height: "100vh",
    width: "100%",
  };

  const carIcon = {
    url: carImg,
    scaledSize: { width: 32, height: 32 }
  }

  const bikeIcon = {
    url: bikeImg,
    scaledSize: { width: 32, height: 32 }
  }

  const handleOnLoad = map => {
    setMapRef(map);
  };
  const handleCenterChanged = () => {
    if (mapref) {
      const newCenter = mapref.getCenter();
      setCenter(newCenter);
    }
  };

//   useEffect(() => {
//     const interval = setInterval(() => {

//       var dt = new Date();
//       var startDate = dt.setSeconds(dt.getSeconds() -1);

//       fetch('http://localhost:8080/api/location/find', {
//         method: 'POST',
//         mode: 'cors',
//         cache: "no-cache",
//         credentials: "include",
//         headers: {'Content-Type': 'application/json'}, 
//         body: JSON.stringify({startDate:'2022-10-01'}),
//       })
//       .then(response => response.json())
//       .then(json => {
//         console.log(json[0].latitude);
//         console.log(json[0].longitude);
//         setPositionCar1({lat: json[0].latitude, lng: json[0].longitude});
//       })
//       .catch(error => console.error('Error:', error));

//     }, 1000);

// }, []);

const onIconClick = (deviceUser, deviceType, deviceSpeed, location) => {

  infoWindowClosed();
  setDeviceUser(deviceUser);
  setDeviceType(deviceType);
  setDeviceSpeed(deviceSpeed);
  setPositionInfoWindow(location);
  setShowingIconWindow(true);

}

  const onMarkerClick = (sensorId, deviceId, interval, sensorName, location) => {

    infoWindowClosed();
    setSearchFlg(false);
    if(sensorId == null){return}

    setTrafficData("");
    setEnvData("");
    setSensorName("");
    setPositionInfoWindow(location);

    var dt1 = new Date();
    var startDate = dt1.setMinutes(dt1.getMinutes() -3);

    setSensorName(sensorName);
    setshowingMarkerWindow(true);

    fetch('http://localhost:8080/avanti_dashboard/api/traffic_env/'+getEndPoint(sensorId)+'/find', {
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      credentials: "include",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({dateOption:"Minutes", sensorId:sensorId, deviceId:deviceId, interval:interval, sensorName:sensorName, startDate:startDate, endDate:new Date()}),
    })
    .then(response => response.json())
    .then(json => {
      if(json[0].length > 0){ setTrafficData(json[0][json[0].length-1])}
      if(json[1].length > 0){ setEnvData(json[1][json[1].length-1])}
      setSearchFlg(true);
    })
    .catch(error => console.error('Error:', error));
  };

  const infoWindowClosed = () => {
    setshowingMarkerWindow(false);
    setShowingIconWindow(false);
  }

    const getEndPoint = (sensorId) => {

    switch (sensorId) {

		  case "59":
		  case "74":
		  case "75":
		  case "76":
		  case "78":
			  return "prd";
		  case "56":
		  case "71":
		  case "72":
			  return "tms-prd";
    }

  }

  return (
    <div className="geoLocation">
      <LoadScript googleMapsApiKey="AIzaSyDZiYtu66ARQqLi8Nhs_YVOiisM7vHvO0w&region=US&language=en">
        <GoogleMap 
        mapContainerStyle={containerStyle} 
        center={center} zoom={2}
        onLoad={handleOnLoad}
        onCenterChanged={handleCenterChanged}
        >
        <Marker position={{lat: 13.720861, lng: 100.565611}} onClick={() => onMarkerClick("56","BKK3",7,"BKK3", {lat: 13.720861, lng: 100.565611})} />
        <Marker position={{lat: 33.832426, lng: -118.263663}} onClick={() => onMarkerClick("59","CRSN1",-7,"CARSON1", {lat: 33.832426, lng: -118.263663})} />
        <Marker position={{lat: 35.653623932775496, lng: 139.69174448283266}} onClick={() => onMarkerClick("71","envboxTYO1",9,"TYO1", {lat: 35.653623932775496, lng: 139.69174448283266})} />
        <Marker position={{lat: 55.67735, lng: 12.37601}} onClick={() => onMarkerClick("75","dollEnv1",1,"DOLL1", {lat: 55.67735, lng: 12.37601})} />
        <Marker position={{lat: 55.68076, lng: 12.37586}} onClick={() => onMarkerClick("78","dollEnv2",1,"DOLL2", {lat: 55.68076, lng: 12.37586})} />
        <Marker position={{lat: 55.68424, lng: 12.38196}} onClick={() => onMarkerClick("","dollEnv3",1,"DOLL3", {lat: 55.68424, lng: 12.38196})} />
        <Marker position={{lat: 55.67936, lng: 12.38293}} onClick={() => onMarkerClick("","dollEnv4",1,"DOLL4", {lat: 55.67936, lng: 12.38293})} />
        <Marker position={{lat: 55.67742, lng: 12.39003}} onClick={() => onMarkerClick("74","dollEnv5",1,"DOLL5", {lat: 55.67742, lng: 12.39003})} />
        <Marker position={{lat: 55.68443, lng: 12.38994}} onClick={() => onMarkerClick("76","dollEnv6",1,"DOLL6", {lat: 55.68443, lng: 12.38994})} />
        <Marker icon={carIcon} position={{lat: 33.462267, lng: -112.046363}} onClick={() => onIconClick("User1","CR-V","60km/h", {lat: 33.462267, lng: -112.046363})} />
        <Marker icon={bikeIcon} position={{lat: 32.788316, lng: -96.806375}} onClick={() => onIconClick("User2","Bike","20km/h", {lat: 32.788316, lng: -96.806375})} />
        <Marker icon={carIcon} position={{lat: 32.672236, lng: -107.025634}} onClick={() => onIconClick("User3","Civic Sedan","50km/h", {lat: 32.672236, lng: -107.025634})} />
        <Marker icon={carIcon} position={{lat: 36.207307, lng: -115.245004}} onClick={() => onIconClick("User4","CR-V","60km/h", {lat: 36.207307, lng: -115.245004})} />

          {showingMarkerWindow ? (
            <InfoWindow position={positionInfoWindow} onCloseClick={infoWindowClosed}>
              <div style={divStyle}>
                <h1>{sensorName}</h1>
                <p>{trafficData.packetTs}</p>
                {!searchFlg ? (<><p>Searching...</p></>) : (
                <>
                <p><span>Total : </span> {
                + trafficData.totalBicycle 
                + trafficData.totalBus 
                + trafficData.totalCar
                + trafficData.totalMotorcycleTuktuk
                + trafficData.totalSUV
                + trafficData.totalTruck
                + trafficData.totalTruckBigRig
                + trafficData.totalVan
                }</p>
                <p>{trafficData.totalBicycle === undefined ? 'Bicycle :  No data' : 'Bicycle : ' + trafficData.totalBicycle}</p>
                <p>{trafficData.totalBus === undefined ? 'Bus : No data' : 'Bus : ' + trafficData.totalBus}</p>
                <p>{trafficData.totalCar === undefined ? 'Car : No data' : 'Car : ' + trafficData.totalCar}</p>
                <p>{trafficData.totalMotorcycleTuktuk === undefined ? 'Motorcycle : No data' : 'Motorcycle : ' + trafficData.totalMotorcycleTuktuk}</p>
                <p>{trafficData.totalSUV === undefined ? 'SUV : No data' : 'SUV : ' + trafficData.totalSUV}</p>
                <p>{trafficData.totalTruck === undefined ? 'Truck : No data' : 'Truck : ' + trafficData.totalTruck}</p>
                <p>{trafficData.totalTruckBigRig === undefined ? 'BigRig : No data' : 'BigRig : ' + trafficData.totalTruckBigRig}</p>
                <p>{trafficData.totalVan === undefined ? 'Van : No data' : 'Van : ' + trafficData.totalVan}</p>
                <p>{envData.co2 === undefined ? 'CO2 : No data' : 'CO2 : ' + envData.co2}</p>
                <p>{envData.decibel === undefined ? 'Decibel : No data' : 'Decibel : ' + envData.decibel}</p>
                <p>{envData.humidity === undefined ? 'Humidity : No data' : 'Humidity : ' + envData.humidity}</p>
                <p>{envData.ozone === undefined ? 'Ozone : No data' : 'Ozone : ' + envData.ozone}</p>
                <p>{envData.mcPm2_5 === undefined ? 'PM2.5 : No data' : 'PM2.5 : ' + envData.mcPm2_5}</p>
                <p>{envData.temperature === undefined ? 'Temperature : No data' : 'Temperature : ' + envData.temperature}</p>
                </>
                )}
              </div>
            </InfoWindow>
            ) : (
              <>
              </>
            )
         }

        {showingIconWindow ? (
            <InfoWindow position={positionInfoWindow} onCloseClick={infoWindowClosed}>
              <div className='iconPopup'>
                <div>{'User : ' + deviceUser}</div>
                <div>{'Type : ' + deviceType}</div>
                <div>{'Speed : ' + deviceSpeed}</div>
              </div>
            </InfoWindow>
            ) : (
              <>
              </>
            )
            }
        </GoogleMap>
      </LoadScript>
    </div>
  );
}