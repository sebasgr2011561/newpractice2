import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { SharingDataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asociarmodal',
  templateUrl: './asociarmodal.component.html',
  styleUrl: './asociarmodal.component.scss'
})
export class AsociarModalComponent {
  
  calificacionForm!: UntypedFormGroup;
  listCalificacion!: any[];
  userId!: number;

  constructor(private api: ApiService, private modalService: NgbModal, public fb: UntypedFormBuilder,
    private dataApi: SharingDataService) { 
      this.userId = +localStorage.getItem('userId')!;
    }

  ngOnInit(): void {
    this.calificacionForm = this.fb.group({
      rutaAprendizaje: ['', [Validators.required]],
    });

    this.cargarRutas();
  }

  cargarRutas() {
    this.api.getFullData('Route', this.userId).subscribe((data) => {
      this.listCalificacion = data.data;
    })
  }

  asociarRecurso() {
    let idRecurso = this.dataApi.idRecurso;

    let data = {
      idRuta: +this.calificacionForm.controls['rutaAprendizaje'].value,
      idRecurso: idRecurso
    }

    Swal.fire({
      title: "¿Deseas guardar el comentario?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No guardar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.createData('AsociacionRuta', data).subscribe((data) => {
          if (data.isSuccess) {
            Swal.fire(data.message, "", "success");
            this.closemodal();
            window.location.reload();
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: data.message
            });
          }
        })
      } else if (result.isDenied) {
        Swal.fire("No se guardaron los cambios", "", "info");
      }
    })
  }

  closemodal() {
    this.modalService.dismissAll();
  }
}
