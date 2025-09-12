import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharingDataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements OnInit {

  listRoles: any = [];

  constructor(private api: ApiService, private route: Router, private dataService: SharingDataService) { 
    
  }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    // Remove header account and wallet button
    document.querySelector('.account')?.classList.add('d-none')
    document.querySelector('.wallet')?.classList.add('d-none')
    document.querySelector('.connectwallet')?.classList.add('d-none')

    //Remove mail subscription footer
    document.querySelector('.footer .bg-dark')?.classList.remove('mt-n10', 'pt-10')
    document.querySelector('.footer.bg-secondary')?.classList.add('d-none')

    this.cargarRoles();
  }

  cargarRoles() {
    this.api.getFullData('Role').subscribe((data) => {
      this.listRoles = data.data;
    })
  }

  actualizarRol(id: number) {
    this.route.navigate(['editRoles']);
    this.dataService.setIdUsuarioEdit(id);
  }

  newRoles() {
    this.route.navigate(['newRoles']);
  }

  eliminarRol(id: number) {
    this.api.deleteData('Role', id).subscribe((data) => {
      if (data.isSuccess) {
        Swal.fire(data.message, "", "success");
        this.cargarRoles();
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
