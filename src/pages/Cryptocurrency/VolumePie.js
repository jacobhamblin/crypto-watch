import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import LoadingPie from "../../components/LoadingPie";
import colors from "../../utils/colors";

export default ({ data, selectExchange, selected }) => {
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie"
    },
    title: { text: "" },
    plotOptions: {
      pie: {
        shadow: false,
        center: ["50%", "50%"],
        allowPointSelect: false,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>"
        },
        events: {
          click: function(event) {
            event.preventDefault();
            if (event.point?.name) selectExchange(event.point.name);
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

  return (
    <div className="pieContainer">
      {Object.keys(data).length ? (
        <HighchartsReact options={options} highcharts={Highcharts} />
      ) : (
        <LoadingPie />
      )}
    </div>
  );
};
