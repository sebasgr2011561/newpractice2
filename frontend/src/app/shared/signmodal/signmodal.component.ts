import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-signmodal',
  templateUrl: './signmodal.component.html',
  styleUrls: ['./signmodal.component.scss']
})
export class SignmodalComponent implements OnInit {

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


  constructor(public formBuilder: UntypedFormBuilder, private modalService: NgbModal, private api: ApiService, private router: Router) { }

  ngOnInit(): void {

    // Validation
    this.formData = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.signupformData = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /**
  * Close modal
  */
   closemodal() {
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
      const username = this.formData.get('email')!.value;
      const pwd = this.formData.get('password')!.value;

      const loginData = {
        username: username,
        password: pwd
      }

      this.api.loginUser('Login', loginData).subscribe((data) => {
        if (data.isSuccess) {
          let token = data.data;
          this.jwtDecode = jwtDecode(token);

          let message = 'Bienvenido ' + this.jwtDecode.name;
          Swal.fire(message);

          localStorage.setItem("Token", token);
          localStorage.setItem("userId", this.jwtDecode.nameid);
          localStorage.setItem("userName", this.jwtDecode.name);
          localStorage.setItem("idRol", this.jwtDecode.sid);

          this.modalService.dismissAll();

          setTimeout(() => {
            window.location.reload();
          }, 1500);
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
