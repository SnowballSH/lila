import Lpv from 'lichess-pgn-viewer';
import { OpeningPage } from './interfaces';
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export function page(data: OpeningPage) {
  $('.opening__intro .lpv').each(function (this: HTMLElement) {
    Lpv(this, {
      pgn: this.dataset['pgn']!,
      initialPly: 'last',
      showMoves: 'bottom',
      showClocks: false,
      showPlayers: false,
      menu: {
        getPgn: {
          enabled: true,
          fileName: (this.dataset['title'] || this.dataset['pgn']).replace(' ', '_') + '.pgn',
        },
      },
    });
  });
  lichess.requestIdleCallback(() => renderHistoryChart(data));
}

const renderHistoryChart = (data: OpeningPage) => {
  const canvas = document.querySelector('.opening__popularity__chart') as HTMLCanvasElement;
  new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.history.map(s => s.month),
      datasets: [
        {
          data: data.history.map(s => s.draws + s.black + s.white),
          borderColor: 'hsla(37,74%,43%,1)',
          backgroundColor: 'hsla(37,74%,43%,0.5)',
          fill: true,
        },
      ],
    },
    options: {
      animation: false,
      scales: {
        y: {
          min: 0,
          // max: 20,
        },
        x: {},
      },
      responsive: true,
    },
  });
};
