import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-routes',
  templateUrl: './add-routes.component.html',
  styleUrl: './add-routes.component.scss'
})
export class AddRoutesComponent implements OnInit {

  rutaForm!: UntypedFormGroup;
  title!: String;
  idRuta!: number;
  
  constructor(private api: ApiService, private fb: UntypedFormBuilder,
    private route: ActivatedRoute, 
    private router: Router ) {
    this.idRuta = +this.route.snapshot.paramMap.get('id')!;

    if (this.idRuta !== 0) {
      this.title = 'Editar ruta';
    } else {
      this.title = 'Agregar nueva ruta';
    }
  }

  ngOnInit(): void {
    this.rutaForm = this.fb.group({
      id: [],
      nombreRuta: ['', [Validators.required]]
    })

    if (this.idRuta !== 0) {
      this.consultarRuta();
    }
    
  }

  consultarRuta() {
    this.api.getDataById('Route', this.idRuta).subscribe((data) => {
      this.rutaForm.controls['id'].setValue(data.data.idRoute);
      this.rutaForm.controls['nombreRuta'].setValue(data.data.nombreRuta);
    })
  }

  addRuta() {

    let idEstudiante = +localStorage.getItem('userId')!;

    let rutaData = {
      idEstudiante: idEstudiante,
      nombreRuta: this.rutaForm.controls['nombreRuta'].value
    }

    if (this.idRuta === 0) {
      Swal.fire({
        title: "¿Deseas guardar los cambios?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.createData('Route', rutaData).subscribe((data) => {
            if (data.isSuccess) {
              Swal.fire(data.message, "", "success");
              this.router.navigate(['/mis-rutas'])
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
    } else {
      Swal.fire({
        title: "¿Deseas guardar los cambios?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.updateData('Route', this.idRuta, rutaData).subscribe((data) => {
            if (data.isSuccess) {
              Swal.fire(data.message, "", "success");
              this.router.navigate(['/mis-rutas'])
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
  }

}
