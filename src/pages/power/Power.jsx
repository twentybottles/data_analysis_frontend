import React, { useState } from 'react';
import BrushChart from "../../components/chart/BrushChart";
import DatePicker from "react-datepicker";
import "./power.css";
import "react-datepicker/dist/react-datepicker.css"
import TodayIcon from "@material-ui/icons/Today";
import ClipLoader from "react-spinners/ClipLoader";
import SlideshowIcon from '@mui/icons-material/Slideshow';

export default function Power() {

  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [searchFlg, setSearchFlg] = useState(false)
  const [deviceId, setDeviceId] = useState(false)
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
    setDeviceId(value)

    switch(value) {
      case "e00fce6864e77592a59d74aa":
        setInterval(-7);
        break;
      case "e00fce681e55b51aac6a26ad":
      case "e00fce68bc4477022b95e5d1":
      case "e00fce68b2ca062ba59ab04a":
      case "e00fce68cae7a82971cdeb54":
      case "e00fce688c783f1c29929279":
      case "e00fce68c0acb5fae3c8d577":
        setInterval(1);
        break;
    }

  }

  const handleSubmit = event => {

    event.preventDefault();
    setSearchFlg(true)

    fetch('http://localhost:8080/avanti_dashboard/api/power_volume/find', {
        method: 'POST',
        mode: 'cors',
        cache: "no-cache",
        credentials: "include",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({dateOption:"Minutes", deviceId:deviceId, startDate:startDate, endDate:endDate, interval:interval}),
      })
      .then(response => response.json())
      .then(json => {
        setData(json)
        setSearchFlg(false)
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="power">
        <form className="searchForm" onSubmit={handleSubmit}>
          <SlideshowIcon sx={{mt : 0.5, mr : 0.5}} />
            <label>
              <select name="sensorId" className="sensorSelect" onChange={selectChangeSensor}>
                <option value="e00fce6864e77592a59d74aa">CRSN1</option>
                <option value="e00fce681e55b51aac6a26ad">DOLL1</option>
                <option value="e00fce68bc4477022b95e5d1">DOLL2</option>
                <option value="e00fce68b2ca062ba59ab04a">DOLL3</option>
                <option value="e00fce68cae7a82971cdeb54">DOLL4</option>
                <option value="e00fce688c783f1c29929279">DOLL5</option>
                <option value="e00fce68c0acb5fae3c8d577">DOLL6</option>
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
          <BrushChart data={data} />
          </>
        )}
      </div>
);
}
  