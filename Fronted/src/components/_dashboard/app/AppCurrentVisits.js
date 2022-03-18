import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';
import { data } from '../../../pages/DashboardApp';
// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

export default function AppCurrentVisits() {
  const theme = useTheme();

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

  const CHART_DATA = [errorVIP(), errorT(), errorIE(), errorG(), errorS()];

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main
    ],
    labels: ['VIP', 'TRANSACCION', 'IMPORTACION Y EXPORTACION', 'GENERAL', 'SEGUROS'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <Card>
      <CardHeader title="Porcentaje de servicios" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={CHART_DATA} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
