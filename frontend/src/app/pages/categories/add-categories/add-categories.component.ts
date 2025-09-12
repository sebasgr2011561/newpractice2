import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharingDataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.scss'
})
export class AddCategoriesComponent implements OnInit {

  categoryForm!: UntypedFormGroup;
  submitted = false;
  idSearch: any;
  title: any;

  constructor(
    private formBuilder: UntypedFormBuilder, 
    private api: ApiService, 
    private route: Router,
    private dataService: SharingDataService
  ) { 
    this.idSearch = this.dataService.idUsuarioEdit == 0 ? 0 : this.dataService.idUsuarioEdit

    if (this.idSearch === 0) {
      this.title = 'Agregar nueva categoria'
    } else {
      this.title = 'Editar categoria'
    }

    
  }

  ngOnInit(): void {
    document.documentElement.scrollTop = 0;

    this.categoryForm = this.formBuilder.group({
      id: [''],
      descripcion: ['', [Validators.required]]
    });

    if (this.idSearch !== 0) {
      this.consultarCategoria();
      this.dataService.setIdUsuarioEdit(0);
    }
  }

  consultarCategoria() {
    this.api.getDataById('Category',  parseInt(this.idSearch)).subscribe((data) => {
      this.categoryForm.controls['id'].setValue(data.data.idCategoria);
      this.categoryForm.controls['descripcion'].setValue(data.data.nombreCategoria);
    })
  }

  get form() {
    return this.categoryForm.controls;
  }

  AddCategory() {
    let categoryData = {
      nombreCategoria: this.categoryForm.controls['descripcion'].value
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
          this.api.createData('Category', categoryData).subscribe((data) => {
            if (data.isSuccess) {
              Swal.fire(data.message, "", "success");
              this.route.navigate(['/categories'])
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
          this.api.updateData('Category', this.idSearch, categoryData).subscribe((data) => {
            if (data.isSuccess) {
              Swal.fire(data.message, "", "success");
              this.route.navigate(['/categories'])
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
