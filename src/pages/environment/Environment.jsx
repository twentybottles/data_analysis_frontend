import React, { useState } from 'react';
import EnvironmentChart from "../../components/chart/EnvironmentChart";
import ChartMax from "../../components/chart/ChartMax";
import DatePicker from "react-datepicker";
import "./environment.css";
import "react-datepicker/dist/react-datepicker.css"
import TodayIcon from "@material-ui/icons/Today";
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ClipLoader from "react-spinners/ClipLoader";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';

export default function Environment() {

  const [sensorId, setSensorId] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [dateOption, setDateOption] = useState('');
  const [envType, setEnvType] = useState('');
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [searchFlg, setSearchFlg] = useState(false);
  const [interval, setInterval] = useState();
  
  const style = {
    display: "flex", 
    justifyContent: "space-evenly", 
    height: "2rem",
    width: "30rem",
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
        setInterval(7);
        break;
      case "CRSN1":
        setInterval(-7);
        break;
      case "envboxTYO1":
      case "envboxTYO2":
        setInterval(9);
        break;
      case "dollEnv1":
      case "dollEnv2":
      case "dollEnv5":
      case "dollEnv6":
        setInterval(1);
        break;
    }
  };

  const selectChangeDateOption = (event) => {
    const value = event.target.value;
    setDateOption(value);
  };

  const selectChangeEnv = (event) => {
    const value = event.target.value;
    setEnvType(value);
  };

  const handleSubmit = event => {

    event.preventDefault();
    setSearchFlg(true);

    fetch('http://localhost:8080/avanti_dashboard/api/environment/find', {
        method: 'POST',
        mode: 'cors',
        cache: "no-cache",
        credentials: "include",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({dateOption:dateOption, sensorId:sensorId, deviceId:deviceId, startDate:startDate, endDate:endDate, interval:interval}),
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
                {/* <option value="BKK3">BKK3</option> */}
                <option value="CRSN1">CARSON1</option>
                <option value="envboxTYO1">TYO1</option>
                {/* <option value="envboxTYO2">TYO2</option> */}
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
            <EmojiNatureIcon sx={{mt : 0.5, mr : 0.5}} />
            <label>
              <select name="envType" className="sensorSelect" onChange={selectChangeEnv}>
                <option value="" selected>--------------</option>
                {/* <option value="AllEnv">All</option> */}
                <option value="Decibel">Decibel</option>
                <option value="Ozone">Ozone</option>
                <option value="Co2">Co2</option>
                <option value="Humidity">Humidity</option>
                <option value="Temperature">Temperature</option>
                <option value="Pm2_5">PM2.5</option>
              </select>
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
          <EnvironmentChart data={data} dataType={envType} title={"Environment Value"}/>
          <ChartMax data={data} dataType={envType} title={"Peak Environment Value"} />
          </>
        )}
      </div>
);
}
  