import React, {useEffect, useRef, useState} from "react"; import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

import LoadingPie from "../../components/LoadingPie";
import * as data from "./data.json";

const BTCHistory = () => {
  const value = useRef([]);
  const [isLoading, setIsLoading] = useState(false);

  const processJson = (json) => {
    const processed = json.map(day => {
      return [moment(day.time_open).valueOf(), Math.round(day.high * 100) / 100];
    });
    const combinedData = value.current.concat(processed).sort((a, b) => a[0] - b[0])
    value.current = combinedData;
  }

  console.log('value')
  console.log(value.current)

  useEffect(() => {
    setIsLoading(true);
    processJson(data.default);
    fetch("https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/historical?start=2020-11-08&end=2021-11-08")
      .then(res => res.json())
      .then(json => processJson(json))
      .then(setIsLoading(false));
  }, [])

  const colors = [
    '#B4F0A8', '#A8F0B4', '#A8F0CC', '#A8F0E4', '#A8E4F0',
    '#A8CCF0', '#A8C0F0', '#A8A8F0', '#C0A8F0', '#D8A8F0',
    '#F0A8F0', '#F0A8D8', '#F0A8C0', '#F0A8A8'
  ];

  const options = {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: '(fake) BTC price since 2013 (until I fix dataset)',
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Time'
      }
    },
    yAxis: {
      labels: {
        format: '$ {value}'
      },
      title: {
        text: 'Price'
      },
      min: 0,
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, colors[3]],
            [1, Highcharts.Color(colors[8]).setOpacity(0).get('rgba')]
          ]
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },

    series: [{
      type: 'area',
      name: 'USD to BTC',
      data: [[1541601000000,52.49],[1541687400000,52.12],[1541773800000,51.12],[1542033000000,48.54],[1542119400000,48.06],[1542205800000,46.7],[1542292200000,47.85],[1542378600000,48.38],[1542637800000,46.47],[1542724200000,44.24],[1542810600000,44.19],[1542983400000,43.07],[1543242600000,43.65],[1543329000000,43.56],[1543415400000,45.24],[1543501800000,44.89],[1543588200000,44.65],[1543847400000,46.21],[1543933800000,44.17],[1544106600000,43.68],[1544193000000,42.12],[1544452200000,42.4],[1544538600000,42.16],[1544625000000,42.28],[1544711400000,42.74],[1544797800000,41.37],[1545057000000,40.99],[1545143400000,41.52],[1545229800000,40.22],[1545316200000,39.21],[1545402600000,37.68],[1545661800000,36.71],[1545834600000,39.29],[1545921000000,39.04],[1546007400000,39.06],[1546266600000,39.44],[1546439400000,39.48],[1546525800000,35.55],[1546612200000,37.06],[1546871400000,36.98],[1546957800000,37.69],[1547044200000,38.33],[1547130600000,38.45],[1547217000000,38.07],[1547476200000,37.5],[1547562600000,38.27],[1547649000000,38.74],[1547735400000,38.97],[1547821800000,39.21],[1548167400000,38.33],[1548253800000,38.48],[1548340200000,38.17],[1548426600000,39.44],[1548685800000,39.08],[1548772200000,38.67],[1548858600000,41.31],[1548945000000,41.61],[1549031400000,41.63],[1549290600000,42.81],[1549377000000,43.54],[1549463400000,43.56],[1549549800000,42.74],[1549636200000,42.6],[1549895400000,42.36],[1549981800000,42.72],[1550068200000,42.54],[1550154600000,42.7],[1550241000000,42.6],[1550586600000,42.73],[1550673000000,43.01],[1550759400000,42.76],[1550845800000,43.24],[1551105000000,43.56],[1551191400000,43.58],[1551277800000,43.72],[1551364200000,43.29],[1551450600000,43.74],[1551709800000,43.96],[1551796200000,43.88],[1551882600000,43.63],[1551969000000,43.13],[1552055400000,43.23],[1552311000000,44.72],[1552397400000,45.23],[1552483800000,45.43],[1552570200000,45.93],[1552656600000,46.53],[1552915800000,47.01],[1553002200000,46.63],[1553088600000,47.04],[1553175000000,48.77],[1553261400000,47.76],[1553520600000,47.19],[1553607000000,46.7],[1553693400000,47.12],[1553779800000,47.18],[1553866200000,47.49],[1554125400000,47.81],[1554211800000,48.51],[1554298200000,48.84],[1554384600000,48.92],[1554471000000,49.25],[1554730200000,50.03],[1554816600000,49.88],[1554903000000,50.15],[1554989400000,49.74],[1555075800000,49.72],[1555335000000,49.81],[1555421400000,49.81],[1555507800000,50.78],[1555594200000,50.97],[1555939800000,51.13],[1556026200000,51.87],[1556112600000,51.79],[1556199000000,51.32],[1556285400000,51.08],[1556544600000,51.15],[1556631000000,50.17],[1556717400000,52.63],[1556803800000,52.29],[1556890200000,52.94],[1557149400000,52.12],[1557235800000,50.72],[1557322200000,50.72],[1557408600000,50.18],[1557495000000,49.29],[1557754200000,46.43],[1557840600000,47.17],[1557927000000,47.73],[1558013400000,47.52],[1558099800000,47.25],[1558359000000,45.77],[1558445400000,46.65],[1558531800000,45.69],[1558618200000,44.92],[1558704600000,44.74],[1559050200000,44.56],[1559136600000,44.35],[1559223000000,44.58],[1559309400000,43.77],[1559568600000,43.33],[1559655000000,44.91],[1559741400000,45.63],[1559827800000,46.31],[1559914200000,47.54],[1560173400000,48.15],[1560259800000,48.7],[1560346200000,48.55],[1560432600000,48.54],[1560519000000,48.19],[1560778200000,48.47],[1560864600000,49.61],[1560951000000,49.47],[1561037400000,49.87],[1561123800000,49.69],[1561383000000,49.65],[1561469400000,48.89],[1561555800000,49.95],[1561642200000,49.94],[1561728600000,49.48],[1561987800000,50.39],[1562074200000,50.68],[1562160600000,51.1],[1562333400000,51.06],[1562592600000,50.01],[1562679000000,50.31],[1562765400000,50.81],[1562851800000,50.44],[1562938200000,50.83],[1563197400000,51.3],[1563283800000,51.13],[1563370200000,50.84],[1563456600000,51.42],[1563543000000,50.65],[1563802200000,51.81],[1563888600000,52.21],[1563975000000,52.17],[1564061400000,51.76],[1564147800000,51.94],[1564407000000,52.42],[1564493400000,52.19],[1564579800000,53.26],[1564666200000,52.11],[1564752600000,51.01],[1565011800000,48.33],[1565098200000,49.25],[1565184600000,49.76],[1565271000000,50.86],[1565357400000,50.25],[1565616600000,50.12],[1565703000000,52.24],[1565789400000,50.69],[1565875800000,50.44],[1565962200000,51.63],[1566221400000,52.59],[1566307800000,52.59],[1566394200000,53.16],[1566480600000,53.12],[1566567000000,50.66],[1566826200000,51.62],[1566912600000,51.04],[1566999000000,51.38],[1567085400000,52.25],[1567171800000,52.19],[1567517400000,51.42],[1567603800000,52.3],[1567690200000,53.32],[1567776600000,53.31],[1568035800000,53.54],[1568122200000,54.17],[1568208600000,55.9],[1568295000000,55.77],[1568381400000,54.69],[1568640600000,54.97],[1568727000000,55.17],[1568813400000,55.69],[1568899800000,55.24],[1568986200000,54.43],[1569245400000,54.68],[1569331800000,54.42],[1569418200000,55.26],[1569504600000,54.97],[1569591000000,54.71],[1569850200000,55.99],[1569936600000,56.15],[1570023000000,54.74],[1570109400000,55.21],[1570195800000,56.75],[1570455000000,56.76],[1570541400000,56.1],[1570627800000,56.76],[1570714200000,57.52],[1570800600000,59.05],[1571059800000,58.97],[1571146200000,58.83],[1571232600000,58.59],[1571319000000,58.82],[1571405400000,59.1],[1571664600000,60.13],[1571751000000,59.99],[1571837400000,60.79],[1571923800000,60.9],[1572010200000,61.65],[1572269400000,62.26],[1572355800000,60.82],[1572442200000,60.81],[1572528600000,62.19],[1572615000000,63.96],[1572877800000,64.38],[1572964200000,64.28],[1573050600000,64.31],[1573137000000,64.86],[1573223400000,65.04],[1573482600000,65.55],[1573569000000,65.49],[1573655400000,66.12],[1573741800000,65.66],[1573828200000,66.44],[1574087400000,66.78],[1574173800000,66.57],[1574260200000,65.8],[1574346600000,65.5],[1574433000000,65.44],[1574692200000,66.59],[1574778600000,66.07],[1574865000000,66.96],[1575037800000,66.81],[1575297000000,66.04],[1575383400000,64.86],[1575469800000,65.43],[1575556200000,66.39],[1575642600000,67.68],[1575901800000,66.73],[1575988200000,67.12],[1576074600000,67.69],[1576161000000,67.86],[1576247400000,68.79],[1576506600000,69.96],[1576593000000,70.1],[1576679400000,69.93],[1576765800000,70],[1576852200000,69.86],[1577111400000,71],[1577197800000,71.07],[1577370600000,72.48],[1577457000000,72.45],[1577716200000,72.88],[1577802600000,73.41],[1577975400000,75.09],[1578061800000,74.36],[1578321000000,74.95],[1578407400000,74.6],[1578493800000,75.8],[1578580200000,77.41],[1578666600000,77.58],[1578925800000,79.24],[1579012200000,78.17],[1579098600000,77.83],[1579185000000,78.81],[1579271400000,79.68],[1579617000000,79.14],[1579703400000,79.43],[1579789800000,79.81],[1579876200000,79.58],[1580135400000,77.24],[1580221800000,79.42],[1580308200000,81.08],[1580394600000,80.97],[1580481000000,77.38],[1580740200000,77.17],[1580826600000,79.71],[1580913000000,80.36],[1580999400000,81.3],[1581085800000,80.01],[1581345000000,80.39],[1581431400000,79.9],[1581517800000,81.8],[1581604200000,81.22],[1581690600000,81.24],[1582036200000,79.75],[1582122600000,80.9],[1582209000000,80.07],[1582295400000,78.26],[1582554600000,74.54],[1582641000000,72.02],[1582727400000,73.16],[1582813800000,68.38],[1582900200000,68.34],[1583159400000,74.7],[1583245800000,72.33],[1583332200000,75.68],[1583418600000,73.23],[1583505000000,72.26],[1583760600000,66.54],[1583847000000,71.33],[1583933400000,68.86],[1584019800000,62.06],[1584106200000,69.49],[1584365400000,60.55],[1584451800000,63.22],[1584538200000,61.67],[1584624600000,61.19],[1584711000000,57.31],[1584970200000,56.09],[1585056600000,61.72],[1585143000000,61.38],[1585229400000,64.61],[1585315800000,61.94],[1585575000000,63.7],[1585661400000,63.57],[1585747800000,60.23],[1585834200000,61.23],[1585920600000,60.35],[1586179800000,65.62],[1586266200000,64.86],[1586352600000,66.52],[1586439000000,67],[1586784600000,68.31],[1586871000000,71.76],[1586957400000,71.11],[1587043800000,71.67],[1587130200000,70.7],[1587389400000,69.23],[1587475800000,67.09],[1587562200000,69.03],[1587648600000,68.76],[1587735000000,70.74],[1587994200000,70.79],[1588080600000,69.64],[1588167000000,71.93],[1588253400000,73.45],[1588339800000,72.27],[1588599000000,73.29],[1588685400000,74.39],[1588771800000,75.16],[1588858200000,75.93],[1588944600000,77.53],[1589203800000,78.75],[1589290200000,77.85],[1589376600000,76.91],[1589463000000,77.39],[1589549400000,76.93],[1589808600000,78.74],[1589895000000,78.29],[1589981400000,79.81],[1590067800000,79.21],[1590154200000,79.72],[1590499800000,79.18],[1590586200000,79.53],[1590672600000,79.56],[1590759000000,79.49],[1591018200000,80.46],[1591104600000,80.83],[1591191000000,81.28],[1591277400000,80.58],[1591363800000,82.88],[1591623000000,83.36],[1591709400000,86],[1591795800000,88.21],[1591882200000,83.97],[1591968600000,84.7],[1592227800000,85.75],[1592314200000,88.02],[1592400600000,87.9],[1592487000000,87.93],[1592573400000,87.43],[1592832600000,89.72],[1592919000000,91.63],[1593005400000,90.01],[1593091800000,91.21],[1593178200000,88.41],[1593437400000,90.44],[1593523800000,91.2],[1593610200000,91.03],[1593696600000,91.03],[1594042200000,93.46],[1594128600000,93.17],[1594215000000,95.34],[1594301400000,95.75],[1594387800000,95.92],[1594647000000,95.48],[1594733400000,97.06],[1594819800000,97.72],[1594906200000,96.52],[1594992600000,96.33],[1595251800000,98.36],[1595338200000,97],[1595424600000,97.27],[1595511000000,92.85],[1595597400000,92.61],[1595856600000,94.81],[1595943000000,93.25],[1596029400000,95.04],[1596115800000,96.19],[1596202200000,106.26],[1596461400000,108.94],[1596547800000,109.67],[1596634200000,110.06],[1596720600000,113.9],[1596807000000,111.11],[1597066200000,112.73],[1597152600000,109.38],[1597239000000,113.01],[1597325400000,115.01],[1597411800000,114.91],[1597671000000,114.61],[1597757400000,115.56],[1597843800000,115.71],[1597930200000,118.28],[1598016600000,124.37],[1598275800000,125.86],[1598362200000,124.82],[1598448600000,126.52],[1598535000000,125.01],[1598621400000,124.81],[1598880600000,129.04],[1598967000000,134.18],[1599053400000,131.4],[1599139800000,120.88],[1599226200000,120.96],[1599571800000,112.82],[1599658200000,117.32],[1599744600000,113.49],[1599831000000,112],[1600090200000,115.36],[1600176600000,115.54],[1600263000000,112.13],[1600349400000,110.34],[1600435800000,106.84],[1600695000000,110.08],[1600781400000,111.81],[1600867800000,107.12],[1600954200000,108.22],[1601040600000,112.28],[1601299800000,114.96],[1601386200000,114.09],[1601472600000,115.81],[1601559000000,116.79],[1601645400000,113.02],[1601904600000,116.5],[1601991000000,113.16],[1602077400000,115.08],[1602163800000,114.97],[1602250200000,116.97],[1602509400000,124.4],[1602595800000,121.1],[1602682200000,121.19],[1602768600000,120.71],[1602855000000,119.02],[1603114200000,115.98],[1603200600000,117.51],[1603287000000,116.87],[1603373400000,115.75],[1603459800000,115.04],[1603719000000,115.05],[1603805400000,116.6],[1603891800000,111.2],[1603978200000,115.32],[1604064600000,108.86],[1604327400000,108.77],[1604413800000,110.44],[1604500200000,114.95],[1604586600000,119.03],[1604673000000,118.69]],
    }]
  }

  return isLoading ? <LoadingPie /> : <HighchartsReact options={options} highcharts={Highcharts} />
}

export default BTCHistory;
