import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

import { DataService } from '../data.service';
import * as d3 from 'd3';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  public data:any[] = []
  public labels:any[] = []
  public dataSource = {
        datasets: [
            {
                data: this.data,
                backgroundColor: [
                  '#ffcd56', '#ff0000', '#0000ff', '#4d5791', '#a52a2a', '#8a2be2', '#ffebcd'
                ]
            }
        ],
        labels: this.labels
  }

  createChart() {
      var ctx = document.getElementById('myChart') as HTMLCanvasElement;
      var myPieChart = new Chart(ctx, {
          type: "pie",
          data: this.dataSource
      });
  }

created3chart() {
  const width = 300;
  const height = 300;
  const radius = Math.min(width, height) / 2;

  const color = d3.scaleOrdinal<string>()
    .domain(this.labels.map(label => label.toString()))
    .range(['#ffcd56', '#ff0000', '#0000ff', '#4d5791', '#a52a2a', '#8a2be2', '#ffebcd']);

  const svg = d3.select('#d3Chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  const arc = d3.arc()
    .innerRadius(radius - 70)
    .outerRadius(radius);

  const pie = d3.pie<number>()
    .value((d: any) => d)
    .sort(null);

  const data = pie(this.data);

  const path = svg.selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('d', (d: any) => arc(d) as string) // <-- Cast to string
    .attr('fill', (d: any) => color(d.data.toString())); // <-- Convert to string

  // Add labels with polylines
  const labelArc = d3.arc()
    .innerRadius(radius - 40)
    .outerRadius(radius - 40);

  const labels = svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('transform', (d: any) => `translate(${labelArc.centroid(d as d3.DefaultArcObject)})`)
    .attr('dy', '.35em')
    .attr('text-anchor', 'middle')
    .text(d => d.data);
    const polyline = svg.selectAll('polyline')
  .data(data)
  .enter()
  .append('polyline')
  .attr('points', (d: any) => {
    const pos = labelArc.centroid(d);
    return [arc.centroid(d), labelArc.centroid(d), pos].join(' ');
  });

}


  constructor(private http: HttpClient, private dataService: DataService) {}

  ngAfterViewInit(): void {
      this.http.get('http://localhost:3000/budget')
      .subscribe((res: any) => {
        for (var i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
        }
        console.log('dataSource::',this.dataSource);
        this.createChart();
         this.created3chart();

      });
  }
}
