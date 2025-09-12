import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharingDataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrl: './add-roles.component.scss'
})
export class AddRolesComponent implements OnInit {

  roleForm!: UntypedFormGroup;
  submitted = false;
  
  idSearch: any = 0;
  title: any;

  constructor(
    private formBuilder: UntypedFormBuilder, 
    private api: ApiService, 
    private route: Router, 
    private dataService: SharingDataService) { 
      this.idSearch = this.dataService.idUsuarioEdit == 0 ? 0 : this.dataService.idUsuarioEdit

      if (this.idSearch !== 0) {
        this.title = 'Editar Rol';
      } else {
        this.title = 'Agregar nuevo rol';
      }
    }

  ngOnInit(): void {
    document.documentElement.scrollTop = 0;

    this.roleForm = this.formBuilder.group({
      ids: [''],
      descripcion: ['', [Validators.required]]
    });

    if (this.idSearch !== 0) {
      this.consultarRol();
      this.dataService.setIdUsuarioEdit(0);
    }
  }

  consultarRol() {
    this.api.getDataById('Role',  parseInt(this.idSearch)).subscribe((data) => {
      this.roleForm.controls['ids'].setValue(data.data.idRol);
      this.roleForm.controls['descripcion'].setValue(data.data.descripcion);
    })
  }

  get form() {
    return this.roleForm.controls;
  }

  AddRol() {

    let rolData = {
      descripcion: this.roleForm.controls['descripcion'].value
    }

    if (this.idSearch === 0) {
      Swal.fire({
        title: "¿Deseas guardar los cambios?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.createData('Role', rolData).subscribe((data) => {
            if (data.isSuccess) {
              Swal.fire(data.message, "", "success");
              this.idSearch = 0;
              this.dataService.idUsuarioEdit == 0;
              this.route.navigate(['/roles'])
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
          this.api.updateData('Role', this.idSearch, rolData).subscribe((data) => {
            if (data.isSuccess) {
              Swal.fire(data.message, "", "success");
              this.dataService.idUsuarioEdit == 0;
              this.route.navigate(['/roles'])
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
