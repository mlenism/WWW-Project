import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import { data } from '../../../pages/DashboardApp';
// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Servicio ',
    type: 'line',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
  },
  {
    name: 'Team B',
    type: 'line',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
  },
  {
    name: 'Team D',
    type: 'line',
    data: [44, 55, 41, 6, 2, 4, 21, 41, 56, 27, 43]
  },
  {
    name: 'Team E',
    type: 'line',
    data: [44, 55, 41, 17, 22, 4, 2, 1, 56, 27, 43]
  },
  {
    name: 'Team C',
    type: 'line',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
  }
];

export default function AppWebsiteVisits() {
  const errorVIP = () => {
    try {
      return data.stat.data[0].VIP;
    } catch (e) {
      return 20;
    }
  };
  const errorT = () => {
    try {
      return data.stat.data[0]['TRANSACCION DOLARES'];
    } catch (e) {
      return 20;
    }
  };
  const errorIE = () => {
    try {
      return data.stat.data[0]['IMPORTACION Y EXPORTACION'];
    } catch (e) {
      return 20;
    }
  };
  const errorG = () => {
    try {
      return data.stat.data[0].GENERAL;
    } catch (e) {
      return 20;
    }
  };
  const errorS = () => {
    try {
      return data.stat.data[0].SEGUROS;
    } catch (e) {
      return 20;
    }
  };
  const errorMatriz = () => {
    try {
      console.log(data.stat.data);
      return data.stat.data;
    } catch (e) {
      return 20;
    }
  };
  errorMatriz();

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'solid', 'solid', 'solid', 'solid'] },
    labels: [],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Website Visits" subheader="(+43%) than last year" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
