import React, { useState } from 'react';
import TrafficChart from "../../components/chart/TrafficChart";
import ChartMax from "../../components/chart/ChartMax";
import DatePicker from "react-datepicker";
import "./traffic.css";
import "react-datepicker/dist/react-datepicker.css"
import TodayIcon from "@material-ui/icons/Today";
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ClipLoader from "react-spinners/ClipLoader";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

export default function Traffic() {

  const [sensorId, setSensorId] = useState('');
  const [dateOption, setDateOption] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [searchFlg, setSearchFlg] = useState(false);
  const [interval, setInterval] = useState();
  const [endPoint, setEndPoint] = useState();
  
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

    switch(value) {
      case "56":
        setInterval(7);
        setEndPoint("tms-prd");
        break;
      case "59":
        setInterval(-7);
        setEndPoint("prd");
        break;
      case "71":
      case "72":
        setInterval(9);
        setEndPoint("tms-prd");
        break;
      case "74":
      case "75":
      case "76":
      case "78":
        setInterval(1);
        setEndPoint("prd");
        break;
    }

    setSensorId(value);
  };

  const selectChangeDateOption = (event) => {
    const value = event.target.value;
    setDateOption(value);
  };

  const selectChangeVehicle = (event) => {
    const value = event.target.value;
    setVehicleType(value);
  };

  const handleSubmit = event => {

    event.preventDefault();
    setSearchFlg(true)



    fetch('http://localhost:8080/avanti_dashboard/api/traffic_volume/'+endPoint+'/find', {
        method: 'POST',
        mode: 'cors',
        cache: "no-cache",
        credentials: "include",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({dateOption:dateOption, sensorId:sensorId, startDate:startDate, endDate:endDate, interval:interval}),
      })
      .then(response => response.json())
      .then(json => {
        setData(json)
        setSearchFlg(false)
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="traffic">
        <form className="searchForm" onSubmit={handleSubmit}>
            <SlideshowIcon sx={{mt : 0.5, mr : 0.5}} />
            <label>
              <select name="sendorId" className="sensorSelect" onChange={selectChangeSensor}>
                <option value="" selected>--------------</option>
                <option value="56">BKK3</option>
                <option value="59">CARSON1</option>
                <option value="71">TYO1</option>
                {/* <option value="72">TYO2</option> */}
                <option value="75">DOLL1</option>
                <option value="78">DOLL2</option>
                <option value="74">DOLL5</option>
                <option value="76">DOLL6</option>
              </select>
            </label>
            <AccessTimeIcon sx={{mt : 0.5, mr : 0.5}} />
            <label>
              <select name="dateOption" className="sensorSelect" onChange={selectChangeDateOption}>
                <option value="" selected>--------------</option>
                <option value="Minutes">Minutes</option>
                <option value="24Hours">Hour</option>
                {/* <option value="Hour">Hour</option> */}
                <option value="Date">Date</option>
                <option value="Day">Days</option>
                <option value="Month">Month</option>
              </select>
            </label>
            <DirectionsCarIcon sx={{mt : 0.5, mr : 0.5}} />
            <label>
              <select name="vehicleType" className="sensorSelect" onChange={selectChangeVehicle}>
                <option value="" selected>--------------</option>
                <option value="AllVehicles">All</option>
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
          <TrafficChart data={data} dataType={vehicleType} title={"Total Traffic Volume"}/>
          <ChartMax data={data} dataType={vehicleType} title={"Peak Traffic Volume"} />
          </>
        )}
      </div>
);
}
  