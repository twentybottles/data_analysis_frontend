import "./chart.css";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer
} from "recharts";

const formatXAxis = (tickFormat) => {
    return tickFormat.toString().substring(5, 10) + " " + tickFormat.toString().substring(11, 16);
};

export default function BrushChart({ data }) {

  return (
    <div className="brushChart">
      <h3 className="chartTitle1">{"Value"}</h3>
      <ResponsiveContainer width="100%" aspect={3 / 1}>
        <LineChart
          data={data}
          width="1200px"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="eventTime" tick={{fontSize:12}} tickFormatter={formatXAxis} angle={45} textAnchor="top"/>
          <YAxis />
          <Tooltip />
          <Legend wrapperStyle={{paddingTop:"30px"}}/>
          <Line type="monotone" dataKey="currCharge" name="CurrentCharge" stroke="#8884d8" dot={false} />
          <Line type="monotone" dataKey="voltage" name="Voltage" stroke="#008FFB" dot={false} />
          <Line type="monotone" dataKey="extpwrval" name="ExternalPowerValue" stroke="#82ca9d" dot={false} />
        </LineChart>
      </ResponsiveContainer> 
    </div>
  );
}
