import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import { data } from '../../../pages/DashboardApp';
// ----------------------------------------------------------------------

export default function AppWebsiteVisits() {
  const errorf = () => {
    try {
      return data.stat.data[1][0].data;
    } catch (e) {
      return 20;
    }
  };

  const errorG = () => {
    try {
      return data.stat.data[1][1].data;
    } catch (e) {
      return 20;
    }
  };
  const errorIE = () => {
    try {
      return data.stat.data[1][2].data;
    } catch (e) {
      return 20;
    }
  };
  const errorT = () => {
    try {
      return data.stat.data[1][3].data;
    } catch (e) {
      return 20;
    }
  };
  const errorVIP = () => {
    try {
      return data.stat.data[1][4].data;
    } catch (e) {
      return 20;
    }
  };
  const errorS = () => {
    try {
      return data.stat.data[1][5].data;
    } catch (e) {
      return 20;
    }
  };

  const CHART_DATA = [
    {
      name: 'GENERAL ',
      type: 'line',
      data: errorG()
    },
    {
      name: 'IMPORTACION Y EXPORTACION',
      type: 'line',
      data: errorIE()
    },
    {
      name: 'TRANSACCION',
      type: 'line',
      data: errorT()
    },
    {
      name: 'VIP',
      type: 'line',
      data: errorVIP()
    },
    {
      name: 'SEGUROS',
      type: 'line',
      data: errorS()
    }
  ];

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'solid', 'solid', 'solid', 'solid'] },
    labels: errorf(),
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
      <CardHeader title="Servicios atendidos por dias" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
