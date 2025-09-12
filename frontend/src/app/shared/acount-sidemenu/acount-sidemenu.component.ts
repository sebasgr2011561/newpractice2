import { Component, OnInit } from '@angular/core';

// Data Get
import { collections } from 'src/app/pages/account/my-collection/data';
import { favorite } from 'src/app/pages/account/favorite/data';
import { items } from 'src/app/pages/account/my-item/data';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-acount-sidemenu',
  templateUrl: './acount-sidemenu.component.html',
  styleUrls: ['./acount-sidemenu.component.scss']
})

// AcountSidemenu Component
export class AcountSidemenuComponent implements OnInit {

  public isCollapsed = true;
  favorites: any;
  collections: any;
  myitems: any;
  idRol: any;
  esAdministrador: any;
  esDocente: any;
  esEstudiante: any;
  roles: any[] = [];
  RolesEnum: any;

  constructor(private api: ApiService) {
    // Fetch Data
    this.favorites = favorite
    this.collections = collections
    this.myitems = items
  }

  ngOnInit(): void {

    this.RolesEnum = {
      Administrador: 1,
      Docente: 2,
      Estudiante: 3
    }

    this.idRol = +localStorage.getItem('idRol')!;

    setTimeout(() => {
      const pathName = window.location.pathname;
      const items = Array.from(document.querySelectorAll("a.menulist"));
      let matchingMenuItem = items.find((x: any) => {
        return x.pathname === pathName;
      });
      matchingMenuItem?.classList.add('active')
    }, 0);

    this.cargarMenu();
  }

  cargarMenu() {
    if (this.idRol === this.RolesEnum.Administrador) {
      this.esAdministrador = true;
      return;
    } else if (this.idRol === this.RolesEnum.Docente) {
      this.esDocente = true;
      return;
    } else {
      this.esEstudiante = true;
      return;
    }
  }

}
