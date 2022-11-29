import React, { useState } from 'react';
import "./correlation.css";
import ClipLoader from "react-spinners/ClipLoader";
import TodayIcon from "@material-ui/icons/Today";
import DatePicker from "react-datepicker";
import SlideshowIcon from '@mui/icons-material/Slideshow';
import "react-datepicker/dist/react-datepicker.css";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import TrafficCorrelationChart from "../../components/chart/TrafficCorrelationChart";
import EnvironmentCorrelationChart from "../../components/chart/EnvironmentCorrelationChart";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';

export default function AutoCorrelation() {

  const [sensorId, setSensorId] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [dateOption, setDateOption] = useState('');
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [searchFlg, setSearchFlg] = useState(false);
  const [interval, setInterval] = useState();
  const [endPoint, setEndPoint] = useState();
  const [vehicleType, setVehicleType] = useState('');
  const [environmentType, setEnvironmentType] = useState('');
  const [lag, setLag] = useState(12);
  
  const style = {
    display: "flex", 
    justifyContent: "space-evenly", 
    height: "2rem",
    width: "24rem",
    cursor: "pointer",
    marginTop: "5px",
}

  const CustomInput = React.forwardRef((props, ref) => {
    return (
      <div>
        <TodayIcon onClick={props.onClick} />
      </div>
    );
  });
  
  const selectChangeSensor = (event) => {

    const value = event.target.value;
    setDeviceId(value);
    
    switch(value) {
      case "BKK3":
        setSensorId(56);
        setInterval(7);
        setEndPoint("tms-prd");
        break;
      case "CRSN1":
        setSensorId(59);
        setInterval(-7);
        setEndPoint("prd");
        break;
      case "envboxTYO1":
        setSensorId(71);
        setInterval(9);
        setEndPoint("tms-prd");
        break;
      case "dollEnv1":
        setSensorId(75);
        setInterval(1);
        setEndPoint("prd");
      case "dollEnv2":
        setSensorId(78);
        setInterval(1);
        setEndPoint("prd");
      case "dollEnv5":
        setSensorId(74);
        setInterval(1);
        setEndPoint("prd");
      case "dollEnv6":
        setSensorId(76);
        setInterval(1);
        setEndPoint("prd");
        break;
    }
  };

  const selectChangeDateOption = (event) => {
    const value = event.target.value;
    setDateOption(value);
  };

  const selectChangeVehicle = (event) => {
    const value = event.target.value;
    setVehicleType(value);
  };

  const selectChangeEnvironment = (event) => {
    const value = event.target.value;
    setEnvironmentType(value);
  };

  const lagChangeHandler = (event) => {
    const value = event.target.value;
    setLag(value);
  };

  const handleSubmit = event => {

    event.preventDefault();
    setSearchFlg(true);

    fetch('http://localhost:8080/avanti_dashboard/api/correlation/'+endPoint+'/auto', {
        method: 'POST',
        mode: 'cors',
        cache: "no-cache",
        credentials: "include",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({dateOption:dateOption, sensorId:sensorId, deviceId:deviceId, startDate:startDate, endDate:endDate, interval:interval, lag:lag}),
      })
      .then(response => response.json())
      .then(json => {
        setData(json)
        setSearchFlg(false)
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="analysis">
        <form className="searchForm" onSubmit={handleSubmit}>
            <SlideshowIcon sx={{mt : 0.5, mr : 0.5}} />
            <label>
              <select name="sendorId" className="sensorSelect" onChange={selectChangeSensor}>
                <option value="" selected>--------------</option>
                <option value="BKK3">BKK3</option>
                <option value="CRSN1">CARSON1</option>
                <option value="envboxTYO1">TYO1</option>
                <option value="dollEnv1">DOLL1</option>
                <option value="dollEnv2">DOLL2</option>
                <option value="dollEnv5">DOLL5</option>
                <option value="dollEnv6">DOLL6</option>
              </select>
            </label>
            <AccessTimeIcon sx={{mt : 0.5, mr : 0.5}} />
            <label>
              <select name="dateOption" className="sensorSelect" onChange={selectChangeDateOption}>
                <option value="" selected>--------------</option>
                <option value="Minutes">Minutes</option>
                {/* <option value="24Hours">Hour</option> */}
                <option value="Hour">Hour</option>
                <option value="Date">Date</option>
                {/* <option value="Day">Days</option> */}
                {/* <option value="Month">Month</option> */}
              </select>
            </label>
            <DirectionsCarIcon sx={{mt : 0.5, mr : 0.5}} />
            <label>
              <select name="vehicleType" className="sensorSelect" onChange={selectChangeVehicle}>
                <option value="" selected>--------------</option>
                {/* <option value="AllVehicles">All</option> */}
                <option value="Vehicles">totalVehicles</option>
                <option value="Bicycle">Bicycle</option>
                <option value="Bus">Bus</option>
                <option value="Car">Car</option>
                <option value="MotorcycleTuktuk">Motorcycle</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
                <option value="TruckBigRig">BigRig</option>
                <option value="Van">Van</option>
                <option value="CarSUVVan">Car/SUV/Van</option>
              </select>
            </label>
            <EmojiNatureIcon sx={{mt : 0.5, mr : 0.5}} />
            <label>
              <select name="environmentType" className="sensorSelect" onChange={selectChangeEnvironment}>
                <option value="" selected>--------------</option>
                <option value="Decibel">Decibel</option>
                <option value="Ozone">Ozone</option>
                <option value="Co2">Co2</option>
                <option value="Humidity">Humidity</option>
                <option value="Temperature">Temperature</option>
                <option value="Pm2_5">PM2.5</option>
              </select>
            </label>
            <SettingsBackupRestoreIcon sx={{mt : 0.5, mr : 0.5}} />
            <label>
              <input className="inputBox" type="text" id="lag" value={lag} onChange={lagChangeHandler} />
              <span>Lag</span>
            </label>
          <div style={style} >
              <div className="datepicker" >
                <div style={{ display: "flex" }}>
                <TodayIcon sx={{mt : 0.5, mr : 0.5}} />
                  <DatePicker
                    isClearable
                    filterDate={d => {
                      return new Date() > d;
                    }}
                    placeholderText="Select Start Date"
                    showTimeSelect
                    dateFormat="yyyy-MM-dd HH:mm:ss"
                    selected={startDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    onChange={date => setStartDate(date)}
                  />
                  <TodayIcon sx={{mt : 0.5, mr : 0.5}} />
                  <DatePicker
                    isClearable
                    filterDate={d => {
                      return new Date() > d;
                    }}
                    placeholderText="Select End Date"
                    showTimeSelect
                    dateFormat="yyyy-MM-dd HH:mm:ss"
                    selected={endDate}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    onChange={date => setEndDate(date)}
                  />
                </div>
              </div>
          </div>
          <button className="searchButton">Search</button>
        </form>
        {searchFlg ? (
          <ClipLoader className="spinner" color='#1C8EF9' size={100} />
        ) : (
          <>
          <TrafficCorrelationChart data={data[0]} dataType={vehicleType} title={"TrafficCorrelation"}/>
          {sensorId == 56 || sensorId == 71 ? (
            <EnvironmentCorrelationChart data={null} dataType={environmentType} title={"EnvironmentCorrelationChart"}/>
          ) : (
            <EnvironmentCorrelationChart data={data[1]} dataType={environmentType} title={"EnvironmentCorrelationChart"}/>
          )}
          </>
        )}
      </div>
);
}