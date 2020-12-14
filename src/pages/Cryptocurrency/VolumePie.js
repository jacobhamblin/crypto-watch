import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import LoadingPie from "../../components/LoadingPie";
import colors from "../../utils/colors";

export default ({ data, selectExchange }) => {
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie"
    },
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
          format: "<b>{point.name}</b>"
        },
        events: {
          click: function(event) {
            console.log(this);
            console.log("name");
            console.log(this.name);
            console.log(event);
            selectExchange(this.name);
          }
        }
      }
    },
    tooltip: {
      valueSuffix: "%"
    },
    series: [
      {
        name: "Volume",
        data,
        size: "100%",
        dataLabels: {
          formatter: function() {
            return this.y > 5 ? this.name : null;
          },
          color: "#ffffff",
          distance: -20
        }
      }
    ]
  };

  return Object.keys(data).length ? (
    <HighchartsReact options={options} highcharts={Highcharts} />
  ) : (
    <LoadingPie />
  );
};
