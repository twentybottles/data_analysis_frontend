import "./chart.css";
import {
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
  Legend,
  Rectangle,

} from "recharts";

const CustomCursor = props => {
  return <Rectangle fontSize="10" fill="rgba(206, 206, 206, 0.2)" />;
};

const formatXAxis = (tickFormat) => {

  var dateDisplay = "";

  switch(tickFormat.length) {
    case 16:
      dateDisplay = tickFormat.toString().substring(5, 10) + " " + tickFormat.toString().substring(11, 17);
        break;
    default:
      dateDisplay = tickFormat;
      break;
  }

  return dateDisplay;
};

export default function EnvironmentChart({ data, dataType, title }) {

  const Decibel = <><Line stackId="i" dataKey="decibel" name="Decibel" stroke="#7DB3FF"/></>
  const Ozone = <><Line stackId="j" dataKey="ozone" name="Ozone" stroke="#008FFB"/></>
  const Co2 = <><Line stackId="l" dataKey="co2" name="Co2" stroke="#00E396"/></>
  const Humidity = <><Line stackId="m" dataKey="humidity" name="Humidity" stroke="#49457B"/></>
  const Temperature = <><Line stackId="n" dataKey="temperature" name="Temperature" stroke="#775DD0"/></>
  const Pm2_5 = <><Line stackId="k" dataKey="mcPm2_5" name="PM2.5" stroke="#775DD0"/></>

  return (
    <div className="chart">
      <h3 className="chartTitle1">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="eventTime" tick={{fontSize:12}} tickFormatter={formatXAxis} angle={45} textAnchor="top" />
          <YAxis />
          {(() => {
          switch (dataType) {
          case "Decibel":  return Decibel;
          case "Ozone":  return Ozone;
          case "Co2":  return Co2;
          case "Humidity":  return Humidity;
          case "Temperature":  return Temperature;
          case "Pm2_5":  return Pm2_5;
        }
      })()}
          <Legend wrapperStyle={{paddingTop:"30px"}}/>
          <Tooltip cursor={<CustomCursor />} />
        </LineChart>
      </ResponsiveContainer> 
    </div>

  );
}
