import { Component, OnInit } from '@angular/core';
import { product } from './data';

// Sweet Alert
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalificacionmodalComponent } from 'src/app/shared/calificacionmodal/calificacionmodal.component';
import { SharingDataService } from 'src/app/services/data.service';
import { AsociarModalComponent } from 'src/app/shared/asociarmodal/asociarmodal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})

// Product Component
export class ProductComponent implements OnInit {
  products: any;
  sortfilter: any;
  isDesc: boolean = false;
  idRolEstudiante!: number;
  userId!: number;

  constructor(private api: ApiService,
    private route: Router,
    private modalService: NgbModal,
    private dataApi: SharingDataService
  ) { 
    this.idRolEstudiante = +localStorage.getItem('idRol')!;
    this.userId = +localStorage.getItem('userId')!;
  }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    //Fetch Data
    // this.products = product;
    this.sortfilter = 'title';

    // set small decimal point
    this.cargarRecursos();
  }

  cargarRecursos() {
    if (this.idRolEstudiante !== 3) {
      this.api.getFullData('Course', this.userId, this.idRolEstudiante).subscribe((data) => {
        this.products = data.data;
      })
    } else {
      this.api.getDataAssignments("Assignment", this.userId).subscribe((data) => {
        this.products = data.data;
      })
    }
  }

  editproduct(id:number) {
    this.route.navigate(['/addproduct', id]);
  }

  //remove from products
  removeproduct(id: any) {
    this.api.deleteData('Course', id).subscribe((data) => {
      if (data.isSuccess) {
        Swal.fire(data.message, "", "success");
        this.cargarRecursos();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message
        });
      }
    })
  }

  // Sort
  openModal(id: number) {
    this.dataApi.idRecurso = id;
    this.modalService.open(CalificacionmodalComponent, { size: 'md', centered: true });
  }

  openModalAsociar(id: number) {
    this.dataApi.idRecurso = id;
    this.modalService.open(AsociarModalComponent, { size: 'md', centered: true });
  }
}
