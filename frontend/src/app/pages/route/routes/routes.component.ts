import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss'
})
export class RoutesComponent implements OnInit {

  userId!: number;
  listRutas!: any[];

  constructor(private api: ApiService, private route: Router) {
    this.userId = +localStorage.getItem("userId")!;
  }

  ngOnInit(): void {
    this.cargarMisRutas();
  }

  cargarMisRutas() {
    this.api.getFullDataSelect('Route', this.userId).subscribe((data) => {
      this.listRutas = data.data;
    })
  }

  nuevaRuta(){
    this.route.navigate(['nueva-ruta']);
  }

  actualizarMisRutas(id: number){
    this.route.navigate(['editar-ruta', id]);
  }

  eliminarMisRutas(id: number){
    this.api.deleteData('Route', id).subscribe((data) => {
      if (data.isSuccess) {
        Swal.fire(data.message, "", "success");
        this.cargarMisRutas();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message
        });
      }
    })
  }

}
