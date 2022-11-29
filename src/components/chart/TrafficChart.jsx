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

export default function ChartTotal({ data, dataType, title }) {

  const totalAllVehicles = <>
  <Bar stackId="b" dataKey="totalCar" name="Car" fill="#7DB3FF"/>
  <Bar stackId="c" dataKey="totalBus" name="Bus" fill="#008FFB"/>
  <Bar stackId="d" dataKey="totalBicycle" name="Bicycle" fill="#40B7CF"/>
  <Bar stackId="e" dataKey="totalMotorcycleTuktuk" name="Motorcycle" fill="#00E396"/>
  <Bar stackId="f" dataKey="totalSUV" name="SUV" fill="#49457B"/>
  <Bar stackId="g" dataKey="totalTruck" name="Truck" fill="#775DD0"/>
  <Bar stackId="h" dataKey="totalTruckBigRig" name="BigRig" fill="#FF4560"/>
  <Bar stackId="j" dataKey="totalVan" name="Van" fill="#FEB019"/>
  </>

  const totalVehicles = <><Bar stackId="a" dataKey="totalVehicles" name="Vehicles" fill="#1f77b4"/></>
  const totalCar = <><Bar stackId="b" dataKey="totalCar" name="Car" fill="#7DB3FF"/></>
  const totalBus = <><Bar stackId="c" dataKey="totalBus" name="Bus" fill="#008FFB"/></>
  const totalBicycle = <><Bar stackId="d" dataKey="totalBicycle" name="Bicycle" fill="#40B7CF"/></>
  const totalMotorcycleTuktuk = <><Bar stackId="e" dataKey="totalMotorcycleTuktuk" name="Motorcycle" fill="#00E396"/></>
  const totalSUV = <><Bar stackId="f" dataKey="totalSUV" name="SUV" fill="#49457B"/></>
  const totalTruck = <><Bar stackId="g" dataKey="totalTruck" name="Truck" fill="#775DD0"/></>
  const totalBigRig = <><Bar stackId="h" dataKey="totalBigRig" name="BigRig" fill="#FF4560"/></>
  const totalVan = <><Bar stackId="j" dataKey="totalVan" name="Van" fill="#FEB019"/></>
  const totalCarSUVVan = <><Bar stackId="k" dataKey="totalCarSUVVan" name="CarSUVVan" fill="#ff7f0e"/></>

  return (
    <div className="chart">
      <h3 className="chartTitle1">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
          <BarChart data={data}>
          <XAxis dataKey="packetTs" tick={{fontSize:12}} tickFormatter={formatXAxis} angle={45} textAnchor="top" />
          <YAxis />
          {(() => {
          switch (dataType) {
          case "AllVehicles":  return totalAllVehicles;
          case "Vehicles": return totalVehicles;
          case "Car": return totalCar;
          case "Bus":  return totalBus;
          case "Bicycle":  return totalBicycle;
          case "MotorcycleTuktuk":  return totalMotorcycleTuktuk;
          case "SUV":  return totalSUV;
          case "Truck":  return totalTruck;
          case "BigRig":  return totalBigRig;
          case "Van":  return totalVan;
          case "CarSUVVan":  return totalCarSUVVan;
        }
      })()}
          <Legend wrapperStyle={{paddingTop:"30px"}}/>
          <Tooltip cursor={<CustomCursor />} />
          </BarChart>
        </ResponsiveContainer> 
    </div>

  );
}
