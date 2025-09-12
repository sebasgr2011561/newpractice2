import { Component, Input, OnInit, booleanAttribute } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharingDataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})

// Setting Component
export class SettingComponent implements OnInit {

  breadCrumbItems!: any;
  submitted = false;
  userForm!: UntypedFormGroup;
  userId: any;
  roles: any;
  urlImage!: any;

  constructor(private formBuilder: UntypedFormBuilder, 
    private api: ApiService, 
    private dataService: SharingDataService,
    private route: Router) {
    
    this.userId = this.dataService.idUsuarioEdit == 0 ? localStorage.getItem("userId") : this.dataService.idUsuarioEdit
  }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    // Remove header account and wallet button
    document.querySelector('.account')?.classList.add('d-none')
    document.querySelector('.wallet')?.classList.add('d-none')
    document.querySelector('.connectwallet')?.classList.add('d-none')

    //Remove mail subscription footer
    document.querySelector('.footer .bg-dark')?.classList.remove('mt-n10', 'pt-10')
    document.querySelector('.footer.bg-secondary')?.classList.add('d-none')

    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Home', link: '/' },
      { label: 'Marketplace', link: '/' },
      { label: 'Single Project', active: true, link: '/Single Project' }
    ];

    /**
   * Form Validation
   */
    this.userForm = this.formBuilder.group({
      uid: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      cellular: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      bio: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });

    this.consultarRoles();
    
    if (this.userId !== 0) {
      this.consultarUsuario();
    }

  }

  consultarRoles() {
    this.api.getFullData('Role').subscribe((data) => {
      this.roles = data.data;
    })
  }

  consultarUsuario() {
    this.api.getDataById('User',  parseInt(this.userId)).subscribe((data) => {
      this.userForm.controls['uid'].setValue(data.data.idUsuario);
      this.userForm.controls['name'].setValue(data.data.nombres);
      this.userForm.controls['lastname'].setValue(data.data.apellidos);
      this.userForm.controls['cellular'].setValue(data.data.celular);
      this.userForm.controls['email'].setValue(data.data.email);
      this.userForm.controls['password'].setValue('');
      this.userForm.controls['bio'].setValue(data.data.biografia);
      this.urlImage = data.data.imagen;
      localStorage.setItem('urImage', this.urlImage);
    })
  }

  /**
 * Form data get
 */
  get form() {
    return this.userForm.controls;
  }

  saveUser() {

    const formData = new FormData();

    formData.append("idRol", this.userForm.controls['rol'].value);
    formData.append("nombres", this.userForm.controls['name'].value);
    formData.append("apellidos", this.userForm.controls['lastname'].value);
    formData.append("celular", this.userForm.controls['cellular'].value);
    formData.append("email", this.userForm.controls['email'].value);
    formData.append("password", this.userForm.controls['password'].value);
    formData.append("biografia", this.userForm.controls['bio'].value);
    formData.append("imagen", this.imgFile);

    Swal.fire({
      title: "¿Deseas guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No guardar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.updateData('User', this.userId, formData).subscribe((data) => {
          if (data.isSuccess) {
            Swal.fire(data.message, "", "success");
            this.route.navigate(['/usuarios']);
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

    this.submitted = true
  }

  // File Upload
  imageURL: string | undefined;
  imgFile!: File;

  fileChange(event: any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    this.imgFile = fileList.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      document.querySelectorAll('#user_profile').forEach((element: any) => {
        element.src = this.imageURL;
      });
    }
    reader.readAsDataURL(file)
  }

}
