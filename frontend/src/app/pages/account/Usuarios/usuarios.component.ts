import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { USUARIOS, Usuario } from './data';

// Data Get
import { items } from './data';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsermodalComponent } from 'src/app/shared/usermodal/usermodal.component';
import { SettingComponent } from '../setting/setting.component';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SharingDataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-my-item',
  templateUrl: './Usuarios.component.html',
  styleUrls: ['./Usuarios.component.scss']
})

// MyItem Component
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = USUARIOS; // Asigna la lista de usuarios a una propiedad de tu componente


  myitems: any;

  // set the current year
  year: number = new Date().getFullYear();
  private _diff?: any;
  _days?: number;
  _hours?: number;
  _minutes?: number;
  _seconds?: number;
  livelength: any;
  liveitem: any = [];
  solditem: any = [];
  listaUsuarios: any = [];

  public isCollapsed = true;
  formData!: UntypedFormGroup;
  signupformData!:UntypedFormGroup;
  signInFormData!:UntypedFormGroup;
  signupPassfield!: boolean;
  fieldTextType:any;
  submitted = false;
  signupsubmit = false;
  userId:any;
  userName:any;
  jwtDecode:any;

  constructor(private api: ApiService, private route: Router, private dataService: SharingDataService, private modalService: NgbModal,public formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {

    //modal validations
    this.formData = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.signupformData = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });


    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    // Remove header account and wallet button
    document.querySelector('.account')?.classList.add('d-none')
    document.querySelector('.wallet')?.classList.add('d-none')
    document.querySelector('.connectwallet')?.classList.add('d-none')

    //Remove mail subscription footer
    document.querySelector('.footer .bg-dark')?.classList.remove('mt-n10', 'pt-10')
    document.querySelector('.footer.bg-secondary')?.classList.add('d-none')

    // Fetch Data
    this.myitems = items
    this.myitems.filter((item: any) => {
      if (item.status == 'sold') {
        this.solditem.push(item)
      }
      if (item.status == 'live') {
        this.liveitem.push(item)
      }
    })

    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.api.getFullData('User').subscribe((data) => {
      this.listaUsuarios = data.data;
    })
  }

  /**
  * Count date set
  */
  countdown(time: any) {
    if(Date.parse(time) > Date.parse(new Date().toString())){
      this._diff = Date.parse(time) - Date.parse(new Date().toString());
      this._days = Math.floor(this._diff / (1000 * 60 * 60 * 24));
      this._hours = Math.floor((this._diff / (1000 * 60 * 60)) % 24);
      this._minutes = Math.floor((this._diff / 1000 / 60) % 60);
      this._seconds = Math.floor((this._diff / 1000) % 60);
      return ((this._hours < 10) ? '0' + this._hours : this._hours) + ':' + ((this._minutes < 10) ? '0' + this._minutes : this._minutes) + ':' + ((this._seconds < 10) ? '0' + this._seconds : this._seconds)
    }else{
      return '00:00:00'
    }
  }

  actualizarUsuario(id: number) {
    this.route.navigate(['/editar']);
    this.dataService.setIdUsuarioEdit(id);
  }

  eliminarUsuario(id: number) {
    this.api.deleteData('User', id).subscribe((data) => {
      if (data.isSuccess) {
        Swal.fire(data.message, "", "success");
        this.cargarUsuarios();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message
        });
      }
    })
  }

  openModal(id: number) {
    // this.submitted = false;
    this.dataService.idUsuarioEdit = id;
    this.modalService.open(UsermodalComponent, { size: 'md', centered: true });
  }

  closemodal() {
    // this.submitted = false;
    this.modalService.dismissAll();
  }

  toggleFieldTextType(){
    this.fieldTextType = !this.fieldTextType
  }

    /**
   * Password Hide/Show
   */
     togglesignupPassfield() {
      this.signupPassfield = !this.signupPassfield;
    }

  /**
 * Returns form
 */
  get form() {
    return this.formData.controls;
  }

  /**
 * Returns signup form
 */
   get signupform() {
    return this.signupformData.controls;
  }

  /**
 * submit signin form
 */
  signin() {
    if (this.formData.valid) {
      const message = this.formData.get('email')!.value;
      const pwd = this.formData.get('password')!.value;
      this.modalService.dismissAll();
    }
    this.submitted = true;
  }

  signup(){
    if (this.signupformData.valid) {
      const message = this.signupformData.get('email')!.value;
      const pwd = this.signupformData.get('password')!.value;
      this.modalService.dismissAll();
    }
    this.signupsubmit = true;
  }

}
