import { Component, OnInit, ViewChild } from '@angular/core';
import { categoryData, resturants, Reviews } from './data';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  category: any;
  courses: any;

  idRol!: number;
  idUsuario!: number;
  subscribedCourses!: any[];

  constructor(public router: Router, private api: ApiService) { 
    this.idRol = +localStorage.getItem('idRol')!;
    this.idUsuario = +localStorage.getItem('userId')!;
  }

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarRecursos();
    if (this.idRol === 3) {
      this.cargarRecursosSuscritos(); 
    }
    document.querySelector('.cart')?.classList.add('d-none')
  }

  cargarRecursosSuscritos() {
    this.api.getDataAssignments("Assignment", this.idUsuario).subscribe((data) => {
      this.subscribedCourses = data.data;
      localStorage.setItem('subscribedCourses', JSON.stringify(this.subscribedCourses))
    })
  }

  cargarCategorias() {
    this.api.getFullData('Category').subscribe((data) => {
      if (data.isSuccess) {
        this.category = data.data;
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        })
      }
    })
  }

  cargarRecursos() {
    this.api.getFullData('Course').subscribe((data) => {
      if (data.isSuccess) {
        this.courses = data.data;
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        })
      }
    })
  }

  redirectToAuctionLive(idRecurso: number) {
    this.router.navigate(['/recurso', idRecurso]);
  }

  /**
 * Swiper setting
 */
  config = {
    slidesToShow: 4,
    initialSlide: 0,
    dots: true,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 4,
        }
      }
    ]
  };

}
