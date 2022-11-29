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
  return <Rectangle fontSize="10" stroke="rgba(206, 206, 206, 0.2)" />;
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

export default function ChartMax({ data, dataType, title }) {

  const maxAllVehicles = <>
  <Line stackId="b" dataKey="maxCar" name="Car" stroke="#7DB3FF"/>
  <Line stackId="c" dataKey="maxBus" name="Bus" stroke="#008FFB"/>
  <Line stackId="d" dataKey="maxBicycle" name="Bicycle" stroke="#40B7CF"/>
  <Line stackId="e" dataKey="maxMotorcycleTuktuk" name="Motorcycle" stroke="#00E396"/>
  <Line stackId="f" dataKey="maxSUV" name="SUV" stroke="#49457B"/>
  <Line stackId="g" dataKey="maxTruck" name="Truck" stroke="#775DD0"/>
  <Line stackId="h" dataKey="maxTruckBigRig" name="BigRig" stroke="#FF4560"/>
  <Line stackId="j" dataKey="maxVan" name="Van" stroke="#FEB019"/>
  </>

  const maxAllEnv = <>
  <Line stackId="i" dataKey="maxDecibel" name="Decibel" stroke="#7DB3FF"/>
  <Line stackId="j" dataKey="maxOzone" name="Ozone" stroke="#008FFB"/>
  <Line stackId="l" dataKey="maxCo2" name="Co2" stroke="#00E396"/>
  <Line stackId="m" dataKey="maxHumidity" name="Humidity" stroke="#49457B"/>
  <Line stackId="n" dataKey="maxTemperature" name="Temperature" stroke="#775DD0"/>
  <Line stackId="k" dataKey="maxMcPm2_5" name="PM2.5" stroke="#775DD0"/>
  </>

  const maxVehicles = <><Line stackId="a" dataKey="maxVehicles" name="Vehicles" stroke="#1f77b4"/></>
  const maxCar = <><Line stackId="b" dataKey="maxCar" name="Car" stroke="#7DB3FF"/></>
  const maxBus = <><Line stackId="c" dataKey="maxBus" name="Bus" stroke="#008FFB"/></>
  const maxBicycle = <><Line stackId="d" dataKey="maxBicycle" name="Bicycle" stroke="#40B7CF"/></>
  const maxMotorcycleTuktuk = <><Line stackId="e" dataKey="maxMotorcycleTuktuk" name="Motorcycle" stroke="#00E396"/></>
  const maxSUV = <><Line stackId="f" dataKey="maxSUV" name="SUV" stroke="#49457B"/></>
  const maxTruck = <><Line stackId="g" dataKey="maxTruck" name="Truck" stroke="#775DD0"/></>
  const maxBigRig = <><Line stackId="h" dataKey="maxBigRig" name="BigRig" stroke="#FF4560"/></>
  const maxTuktuk = <><Line stackId="i" dataKey="maxTuktuk" name="Tuktuk" stroke="#F4ACB1"/></>
  const maxVan = <><Line stackId="j" dataKey="maxVan" name="Van" stroke="#FEB019"/></>
  const maxCarSUVVan = <><Line stackId="k" dataKey="maxCarSUVVan" name="CarSUVVan" stroke="#ff7f0e"/></>
  const maxDecibel = <><Line stackId="i" dataKey="maxDecibel" name="Decibel" stroke="#7DB3FF"/></>
  const maxOzone = <><Line stackId="j" dataKey="maxOzone" name="Ozone" stroke="#008FFB"/></>
  const maxCo2 = <><Line stackId="l" dataKey="maxCo2" name="Co2" stroke="#00E396"/></>
  const maxHumidity = <><Line stackId="m" dataKey="maxHumidity" name="Humidity" stroke="#49457B"/></>
  const maxTemperature = <><Line stackId="n" dataKey="maxTemperature" name="Temperature" stroke="#775DD0"/></>
  const maxPm2_5 = <><Line stackId="k" dataKey="maxMcPm2_5" name="PM2.5" stroke="#775DD0"/></>

  return (
    <div className="chart">
      <h3 className="chartTitle1">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
        {title.indexOf('Traffic') !== -1 ? (
          <XAxis dataKey="packetTs" tick={{fontSize:12}} tickFormatter={formatXAxis} angle={45} textAnchor="top" />
        ) : (          
          <XAxis dataKey="eventTime" tick={{fontSize:12}} tickFormatter={formatXAxis} angle={45} textAnchor="top" />
        )}
          <YAxis />
          {(() => {
          switch (dataType) {
          case "AllVehicles":  return maxAllVehicles;
          case "Vehicles": return maxVehicles;
          case "Car": return maxCar;
          case "Bus":  return maxBus;
          case "Bicycle":  return maxBicycle;
          case "MotorcycleTuktuk":  return maxMotorcycleTuktuk;
          case "SUV":  return maxSUV;
          case "Truck":  return maxTruck;
          case "BigRig":  return maxBigRig;
          case "Van":  return maxVan;
          case "CarSUVVan":  return maxCarSUVVan;
          case "AllEnv":  return maxAllEnv;
          case "Decibel":  return maxDecibel;
          case "Ozone":  return maxOzone;
          case "Co2":  return maxCo2;
          case "Humidity":  return maxHumidity;
          case "Temperature":  return maxTemperature;
          case "Pm2_5":  return maxPm2_5;
        }
      })()}
          <Legend wrapperStyle={{paddingTop:"30px"}}/>
          <Tooltip cursor={<CustomCursor />} />
        </LineChart>
        </ResponsiveContainer>
    </div>

  );
}
