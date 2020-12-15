import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import LoadingPie from "../../components/LoadingPie";
import colors from "../../utils/colors";
Highcharts.setOptions({
  lang: {
    thousandsSep: ","
  }
});

export default ({ data, selectExchange, selected }) => {
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "scatter"
    },
    title: { text: "" },
    plotOptions: {
      scatter: {
        shadow: false,
        center: ["50%", "50%"],
        allowPointSelect: false,
        cursor: "pointer",
        events: {
          click: function(event) {
            event.preventDefault();
            if (event.point?.name) selectExchange(event.point.name);
          }
        }
      },
      series: {
        label: {
          connectorAllowed: false
        }
      }
    },
    xAxis: {
      title: {
        enabled: true,
        text: "Exchange"
      },
      type: "category",
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true
    },
    yAxis: {
      title: {
        text: "Price (USD)"
      }
    },
    tooltip: {
      crosshairs: false,
      shared: true,
      pointFormat: "{point.y:,.0f}",
      valuePrefix: "$"
    },
    series: [
      {
        name: "Price",
        data,
        size: "100%",
        showInLegend: false,
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
    <div className="columnContainer">
      {Object.keys(data).length ? (
        <HighchartsReact options={options} highcharts={Highcharts} />
      ) : (
        <LoadingPie />
      )}
    </div>
  );
};
