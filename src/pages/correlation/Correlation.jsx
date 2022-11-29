import React, { useState } from 'react';
import "./correlation.css";
import Plot from 'react-plotly.js';
import ClipLoader from "react-spinners/ClipLoader";
import TodayIcon from "@material-ui/icons/Today";
import DatePicker from "react-datepicker";
import SlideshowIcon from '@mui/icons-material/Slideshow';
import "react-datepicker/dist/react-datepicker.css";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Correlation() {

  const [data, setData] = useState([]);
  const [corr, setCorr] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchFlg, setSearchFlg] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [sensorId, setSensorId] = useState('');
  const [dateOption, setDateOption] = useState('Minutes');
  const [interval, setInterval] = useState();
  const [minutes, setMinutes] = useState(1);
  const [endPoint, setEndPoint] = useState();


  const style = {
    display: "flex", 
    justifyContent: "space-evenly", 
    height: "2rem",
    width: "30rem",
    cursor: "pointer",
    marginTop: "5px",
}

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
      case "envboxTYO2":
        setSensorId(72);
        setInterval(9);
        setEndPoint("tms-prd");
        break;
      case "dollEnv1":
        setSensorId(75);
        setInterval(1);
        setEndPoint("prd");
        break;
      case "dollEnv2":
        setSensorId(78);
        setInterval(1);
        setEndPoint("prd");
        break;
      case "dollEnv5":
        setSensorId(74);
        setInterval(1);
        setEndPoint("prd");
        break;
      case "dollEnv6":
        setSensorId(76);
        setInterval(1);
        setEndPoint("prd");
        break;
    
    }
 
  };

  const minutesChangeHandler = (event) => {
    const value = event.target.value;
    setMinutes(value);
  };

  const handleSubmit = event => {

    event.preventDefault();
    setSearchFlg(true)

    fetch('http://localhost:8080/avanti_dashboard/api/correlation/'+endPoint+'/normal', {
        method: 'POST',
        mode: 'cors',
        cache: "no-cache",
        credentials: "include",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({dateOption:dateOption, sensorId:sensorId, deviceId:deviceId, startDate:startDate, endDate:endDate, interval:interval, minutes:minutes}),
      })
      .then(response => response.json())
      .then(json => {
        setCorr(json.corrMap)
        setSearchFlg(false)
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="correlation">
        <form className="searchForm" onSubmit={handleSubmit}>
          <SlideshowIcon sx={{mt : 0.5, mr : 0.5}} />
          <label>
              <select name="deviceId" className="sensorSelect" onChange={selectChangeSensor}>
                <option value="" selected>--------------</option>
                {/* <option value="BKK3">BKK3</option> */}
                <option value="CRSN1">CRSN1</option>
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
              <input className="inputBox" type="text" id="minutes" value={minutes} onChange={minutesChangeHandler} />
              <span>Minutes</span>
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
      <Plot
        data={[
          {
            y: ['Decibel', 'Ozone', 'Co2', 'Humidity', 'Temperature', 'PM 2.5'],
            x: ['Bicycle', 'Bus', 'Car', 'Motorcycle', 'SUV', 'Truck', 'BigRig', 'Van'],
            z: corr,
            type: "heatmap",
          },
        ]}
      layout={{ width: 1100, height: 700, margin: {l: 100}, title: "Traffic & Enviroment" }}
      config={{displayModeBar: false}}
      />
          </>
        )}
    </div>
  );
}