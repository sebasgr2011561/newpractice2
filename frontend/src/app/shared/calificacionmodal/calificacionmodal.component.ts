import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { SharingDataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calificacionmodal',
  templateUrl: './calificacionmodal.component.html',
  styleUrl: './calificacionmodal.component.scss'
})
export class CalificacionmodalComponent {
  
  calificacionForm!: UntypedFormGroup;
  listCalificacion!: any[];

  constructor(private api: ApiService, private modalService: NgbModal, public fb: UntypedFormBuilder,
    private dataApi: SharingDataService) { }

  ngOnInit(): void {
    this.calificacionForm = this.fb.group({
      idCalificacion: ['', [Validators.required]],
      idUsuario: ['', [Validators.required]],
      idRecurso: ['', [Validators.required]],
      calificacion: ['', [Validators.required]],
      comentario: ['', [Validators.required]],
    });

    this.listCalificacion = [
      {
        id: 5,
        descripcion: "Muy bueno"
      },
      {
        id: 4,
        descripcion: "Bueno"
      },
      {
        id: 3,
        descripcion: "Regular"
      },
      {
        id: 2,
        descripcion: "Malo"
      },
      {
        id: 1,
        descripcion: "Muy malo"
      }
    ]
  }

  calificarRecurso() {
    let idRecurso = this.dataApi.idRecurso;
    let idUsuario = +localStorage.getItem('userId')!;

    let data = {
      idUsuario: idUsuario,
      idRecurso: idRecurso,
      calificacion: +this.calificacionForm.controls['calificacion'].value,
      comentario: this.calificacionForm.controls['comentario'].value
    }

    Swal.fire({
      title: "¿Deseas guardar el comentario?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No guardar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.createData('Qualification', data).subscribe((data) => {
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
