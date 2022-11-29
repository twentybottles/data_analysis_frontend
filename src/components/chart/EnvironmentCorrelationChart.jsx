import "./chart.css";
import {
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  Legend,
  Rectangle,

} from "recharts";

const CustomCursor = props => {
  return <Rectangle fontSize="10" fill="rgba(206, 206, 206, 0.2)" />;
};

export default function EnvironmentCorrelationChart({ data, dataType, title }) {

  const Decibel = <><Bar stackId="i" dataKey="decibel" name="Decibel" fill="#7DB3FF"/></>
  const Ozone = <><Bar stackId="j" dataKey="ozone" name="Ozone" fill="#008FFB"/></>
  const Co2 = <><Bar stackId="l" dataKey="co2" name="Co2" fill="#00E396"/></>
  const Humidity = <><Bar stackId="m" dataKey="humidity" name="Humidity" fill="#49457B"/></>
  const Temperature = <><Bar stackId="n" dataKey="temperature" name="Temperature" fill="#775DD0"/></>
  const Pm2_5 = <><Bar stackId="k" dataKey="mcPm2_5" name="PM2.5" fill="#775DD0"/></>

  return (
    <div className="chart">
      <h3 className="chartTitle1">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
          <BarChart data={data}>
          <XAxis dataKey="lag" tick={{fontSize:14}} />
          <YAxis domain={[-1, 1]} />
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
          </BarChart>
        </ResponsiveContainer> 
    </div>

  );
}
