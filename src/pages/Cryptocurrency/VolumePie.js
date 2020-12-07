import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import colors from "../../utils/colors";

export default ({ data, selectExchange }) => {
  const options = {
    title: {
      text: "Exchange Volume"
    },
    plotOptions: {
      pie: {
        shadow: false,
        center: ["50%", "50%"],
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %"
        }
      }
    },
    tooltip: {
      valueSuffix: "%"
    },
    series: [
      {
        name: "Exchanges",
        data,
        size: "60%",
        dataLabels: {
          formatter: function() {
            return this.y > 5 ? this.name : null;
          },
          color: "#ffffff",
          distance: -30
        }
      }
    ]
  };

  return <HighchartsReact options={options} highcharts={Highcharts} />;
};
