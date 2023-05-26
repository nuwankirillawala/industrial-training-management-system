import { Chart } from "react-google-charts";

const SimplePieChart = ({options, data}) => {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"200px"}
    />
  )
}

export default SimplePieChart