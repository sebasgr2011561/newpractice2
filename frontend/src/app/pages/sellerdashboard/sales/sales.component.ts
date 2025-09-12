import { Component, OnInit } from '@angular/core';
import { linewithDataChart, OrderCountChart } from './data';
import { ChartType } from './sales.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})

// Sales Component
export class SalesComponent implements OnInit {
  linewithDataChart!: ChartType;
  OrderCountChart!: ChartType;
  basicLineChart: any;

  idProfesor!: number;
  idRol!: number;

// Active
  listCoursesActive: Array<string> = [];
  listSubscriptionsActive: Array<string> = [];
  listDashboardActive: any[] = [];

// Inactive
  listCoursesInactive: Array<string> = [];
  listSubscriptionsInactive: Array<string> = [];
  listDashboardInactive: any[] = [];

  constructor(private api: ApiService) { 
    this.idRol = +localStorage.getItem('idRol')!;
    this.idProfesor = this.idRol === 2 ? +localStorage.getItem('userId')! : 0;
  }

  ngOnInit(): void {
    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    // Get data Dashboard
    this.cargarDashboardActive();
    this.cargarDashboardInactive();

    //fetch data
    setTimeout(() => {
      this.mostrarDataActiveDashboard();
      this.mostrarDataInactiveDashboard();  
    }, 1000);
    
    
  }

  mostrarDataInactiveDashboard() {
    this.OrderCountChart = OrderCountChart;
    this.OrderCountChart.series[0].data = this.listSubscriptionsInactive;
    this.OrderCountChart.xaxis.categories = this.listCoursesInactive;
    this.OrderCountChart.yaxis.max = this.listCoursesInactive.length;
  }

  mostrarDataActiveDashboard() {
    this.linewithDataChart = linewithDataChart;
    this.linewithDataChart.series[0].data = this.listSubscriptionsActive;
    this.linewithDataChart.xaxis.categories = this.listCoursesActive;
    this.linewithDataChart.yaxis.max = this.listCoursesActive.length;
  }

  cargarDashboardActive() {
    if (this.idProfesor > 0) {
      this.api.getDashboardActive('Dashboard', this.idProfesor).subscribe((data) => {
        this.listDashboardActive = data.data;
        if (this.listDashboardActive.length > 0) {
          this.listDashboardActive.forEach(element => {
            let nombreRecurso = element.nombreRecurso;
            let subscriptions = element.estudiantesRegistrados;

            this.listCoursesActive.push(nombreRecurso);
            this.listSubscriptionsActive.push(subscriptions)
          });
        }
      });
    }
  }

  cargarDashboardInactive() {
    if (this.idProfesor > 0) {
      this.api.getDashboardInactive('Dashboard', this.idProfesor).subscribe((data) => {
        this.listDashboardInactive = data.data;
        if (this.listDashboardInactive.length > 0) {
          this.listDashboardInactive.forEach(element => {
            let nombreRecurso = element.nombreRecurso;
            let subscriptions = element.estudiantesRegistrados;

            this.listCoursesInactive.push(nombreRecurso);
            this.listSubscriptionsInactive.push(subscriptions)
          });
        }
      });
    }
  }
}
