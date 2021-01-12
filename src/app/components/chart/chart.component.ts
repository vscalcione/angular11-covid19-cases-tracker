import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  data: any;

  @Input()
  theme: 'dark' | 'light' = 'light';

  @ViewChild('chart')
  private elementRef: ElementRef<HTMLCanvasElement> | any;

  chartEl: any;

  chart: Chart | any;
  ctx: CanvasRenderingContext2D | any;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.chart.data = this.data;
      this.chart.update();
    }
  }

  ngAfterViewInit() {
    this.chartEl = this.elementRef.nativeElement;
    if (this.chartEl) {
      this.ctx = this.chartEl.getContext('2d');
      this.chart = new Chart(this.ctx, {
        type: 'line',
        options: {
          legend: {
            labels: {
              fontColor: this.theme === 'dark' ? 'white' : 'black',
            },
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  color:
                    this.theme === 'dark'
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.1)',
                },
                ticks: {
                  beginAtZero: true,
                  fontColor: this.theme === 'dark' ? 'white' : 'black',
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  color:
                    this.theme === 'dark'
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.1)',
                },
                ticks: {
                  fontColor: this.theme === 'dark' ? 'white' : 'black',
                },
              },
            ],
          },
          plugins: {
            zoom: {
              pan: {
                enabled: true,
                mode: 'xy',
              },
              zoom: {
                enabled: true,
                mode: 'xy',
              },
            },
          },
        },
      });

      if (this.chart && this.data) {
        this.chart.data = this.data;
        this.chart.update();
      }
    }
  }
}
