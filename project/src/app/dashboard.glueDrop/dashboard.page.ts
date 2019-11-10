import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  lineChartData: Array<any> = [
    { data: [10, 6, 10, 12, 8, 15, 1], label: 'Сахар' },
    { data: [8, 4, 7, 9, 10, 5, 3], label: 'ХЕ' },
    { data: [9, 9, 9, 9, 9, 9, 9], label: 'Высокий уровень сахара'},
    { data: [4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5], label: 'Низкий уровень сахара'}
  ];
  lineChartLabels: Array<any> = [6, 8, 10, 12, 14, 16, 18, 20, 22];
  lineChartOptions: any = {
    legend: {
      labels: {
        fontColor: 'white', // legend color (can be hexadecimal too)
      },
    },
    animation: false,
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
          id: 'x-axis-0',
          position: 'bottom',
          ticks: {
            fontColor: 'white',
          },
        gridLines: {
          color: 'transparent',
        },
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            stepSize: 4,
            beginAtZero: true,
            fontColor: 'white',
          },
          gridLines: {
            color: 'gray',
          },
        },
      ],
    },
  };
  lineChartColors: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: '#63d0c5',
      pointBackgroundColor: 'rgba(255,255,255,1)',
      pointBorderColor: '#61CFE9',
    },
    {
      backgroundColor: 'transparent',
      borderColor: '#FFDD7D',
      pointBackgroundColor: 'rgba(255,255,255,1)',
      pointBorderColor: '#FFDD7D'
    },
    {
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,137,192,1)',
      pointBackgroundColor: 'rgba(255,137,192,1)',
      pointBorderColor: 'rgba(255,137,192,1)'
    },
    {
      backgroundColor: 'transparent',
      borderColor: 'rgba(97,207,233,1)',
      pointBackgroundColor: 'rgba(97,207,233,1)',
      pointBorderColor: 'rgba(97,207,233,1)'
    }
  ];
  lineChartLegend = false;
  lineChartType = 'line';


  doughnutChartLabels: string[] = ['Высокий уровень сахара', 'Нормальный уровень сахара', 'Низкий уровень сахара',  ];
  doughnutChartData: number[] = [200, 150, 100];
  doughnutChartType = 'doughnut';

  doughnutChartOptions: any = {
    circumference: Math.PI,
    rotation: 0.5 * Math.PI,
    responsive: true,
    maintainAspectRatio: false
  };
  doughnutChartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255,137,192,1)',
        'rgba(151,198,107,1)',
        'rgba(97,207,233,1)',
      ]
    }
  ];
  doughnutChartLegend = false;

  constructor() { }

  ngOnInit() {
  }

  // events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }

}
