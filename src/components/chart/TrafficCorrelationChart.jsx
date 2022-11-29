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

export default function TrafficCorrelationChart({ data, dataType, title }) {

  const AllVehicles = <>
  <Bar stackId="a" dataKey="vehicles" name="Vehicles" fill="#1f77b4"/>
  <Bar stackId="b" dataKey="car" name="Car" fill="#7DB3FF"/>
  <Bar stackId="c" dataKey="bus" name="Bus" fill="#008FFB"/>
  <Bar stackId="d" dataKey="bicycle" name="Bicycle" fill="#40B7CF"/>
  <Bar stackId="e" dataKey="motorcycleTuktuk" name="Motorcycle" fill="#00E396"/>
  <Bar stackId="f" dataKey="suv" name="SUV" fill="#49457B"/>
  <Bar stackId="g" dataKey="truck" name="Truck" fill="#775DD0"/>
  <Bar stackId="h" dataKey="truckBigRig" name="BigRig" fill="#FF4560"/>
  <Bar stackId="j" dataKey="van" name="Van" fill="#FEB019"/>
  <Bar stackId="k" dataKey="carSuvVan" name="CarSUVVan" fill="#ff7f0e"/>
  </>

  const Vehicles = <><Bar stackId="a" dataKey="vehicles" name="Vehicles" fill="#1f77b4"/></>
  const Car = <><Bar stackId="b" dataKey="car" name="Car" fill="#7DB3FF"/></>
  const Bus = <><Bar stackId="c" dataKey="bus" name="Bus" fill="#008FFB"/></>
  const Bicycle = <><Bar stackId="d" dataKey="bicycle" name="Bicycle" fill="#40B7CF"/></>
  const MotorcycleTuktuk = <><Bar stackId="e" dataKey="motorcycleTuktuk" name="Motorcycle" fill="#00E396"/></>
  const SUV = <><Bar stackId="f" dataKey="suv" name="SUV" fill="#49457B"/></>
  const Truck = <><Bar stackId="g" dataKey="truck" name="Truck" fill="#775DD0"/></>
  const BigRig = <><Bar stackId="h" dataKey="truckBigRig" name="BigRig" fill="#FF4560"/></>
  const Van = <><Bar stackId="j" dataKey="van" name="Van" fill="#FEB019"/></>
  const CarSUVVan = <><Bar stackId="k" dataKey="carSuvVan" name="CarSUVVan" fill="#ff7f0e"/></>

  return (
    <div className="chart">
      <h3 className="chartTitle1">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
          <BarChart data={data}>
          <XAxis dataKey="lag" tick={{fontSize:14}} />
          <YAxis domain={[-1, 1]} />
          {(() => {
          switch (dataType) {
          case "AllVehicles":  return AllVehicles;
          case "Vehicles": return Vehicles;
          case "Car": return Car;
          case "Bus":  return Bus;
          case "Bicycle":  return Bicycle;
          case "MotorcycleTuktuk":  return MotorcycleTuktuk;
          case "SUV":  return SUV;
          case "Truck":  return Truck;
          case "TruckBigRig":  return BigRig;
          case "Van":  return Van;
          case "CarSUVVan":  return CarSUVVan;
        }
      })()}
          <Legend wrapperStyle={{paddingTop:"30px"}}/>
          <Tooltip cursor={<CustomCursor />} />
          </BarChart>
        </ResponsiveContainer> 
    </div>

  );
}
