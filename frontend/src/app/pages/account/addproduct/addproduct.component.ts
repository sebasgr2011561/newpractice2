import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormArray, AbstractControl } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursomodalComponent } from 'src/app/shared/recursomodal/recursomodal.component';
import { SharingDataService } from 'src/app/services/data.service';


// Data Get
//import { product } from '../product/data';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
})

// Addproduct Component
export class AddproductComponent implements OnInit {
  recursoForm!: UntypedFormGroup;
  submitted = false;

  userForm: UntypedFormGroup;
  selectedcategory: any;
  itemData!: UntypedFormGroup;

  categorias: any;

  public isCollapsed = true;
  formData!: UntypedFormGroup;
  signupformData!:UntypedFormGroup;
  signInFormData!:UntypedFormGroup;
  signupPassfield!: boolean;
  fieldTextType:any;
  signupsubmit = false;
  userId:any;
  userName:any;
  jwtDecode:any;

  idRecurso: number  = 0;
  idRecursoParam: number  = 0;
  idRol: number = 0;
  imgBase64!: string | undefined;
  messageButton!: string | undefined;

  isActive = true;

  constructor(private route: Router, 
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder, 
    private api: ApiService,
    private dataApi: SharingDataService,
    private router: ActivatedRoute
  ) {
    this.selectedcategory = 'ETH'

    this.userForm = this.formBuilder.group({
      sizes: this.formBuilder.array([
        this.formBuilder.control(null)
      ])
    })

    this.idRol = +localStorage.getItem('idRol')!;
    this.idRecursoParam = +this.router.snapshot.paramMap.get('id')!;

    if (this.idRecursoParam === 0) {
      this.messageButton = "Guardar recurso";
    } else {
      this.messageButton = "Actualizar recurso";
    }
  }

  ngOnInit(): void {

    
    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    /**
     * Form Validation
     */
    this.recursoForm = this.formBuilder.group({
      id: [''],
      idProfesor: ['', [Validators.required]],
      idCategoria: ['', [Validators.required]],
      nombreRecurso: ['', [Validators.required]],
      imagenPortada: [''],
      descripcion: ['', [Validators.required]],
      duracion: ['', [Validators.required]],
      precio: ['', [Validators.required]]
    });

    this.cargarCategorias();

    if (this.idRecursoParam !== 0) {
      this.cargarRecurso(); 
    }

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
  }

  cargarRecurso() {
    this.api.getDataById('Course', this.idRecursoParam).subscribe((data) => {
      this.recursoForm.controls['nombreRecurso'].setValue(data.data.nombreRecurso);
      this.recursoForm.controls['imagenPortada'].setValue(data.data.imagenPortada);
      this.recursoForm.controls['descripcion'].setValue(data.data.descripcion);
      this.recursoForm.controls['duracion'].setValue(data.data.duracion);
      this.recursoForm.controls['precio'].setValue(data.data.precio);
    })
  }

  cargarCategorias() {
    this.api.getFullData('Category').subscribe((data) => {
      this.categorias = data.data;
    })
  }

  /**
   * Form data get
   */
  openModal() {
    this.dataApi.idRecurso = this.idRecurso;
    this.dataApi.idRecursoParam = this.idRecursoParam
    this.modalService.open(RecursomodalComponent, { size: 'lg', centered: true });
  }

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

  // File Upload
  imageURL: string | undefined;
  fileChange(event: any) {
    let fileList: any = event.target as HTMLInputElement;
    let file: File = fileList.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  /**
   * Save user
   */
  AddProduct() {

    const formData = new FormData();

    formData.append("IdProfesor", localStorage.getItem('userId')!);
    formData.append("IdCategoria", this.recursoForm.controls['idCategoria'].value);
    formData.append("NombreRecurso", this.recursoForm.controls['nombreRecurso'].value);
    formData.append("ImagenRecurso", this.files[0]!);
    formData.append("Descripcion", this.recursoForm.controls['descripcion'].value);
    formData.append("Duracion", this.recursoForm.controls['duracion'].value);
    formData.append("Precio", this.recursoForm.controls['precio'].value);

    if (this.idRecursoParam === 0) {
      Swal.fire({
        title: "¿Deseas guardar los cambios?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.createData('Course', formData).subscribe((data) => {
            if (data.isSuccess) {
              Swal.fire(data.message, "", "success");
              this.idRecurso = data.data;
              this.dataApi.idRecurso = data.data;
              this.isActive = false;
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
          this.api.updateData('Course', this.idRecursoParam, formData).subscribe((data) => {
            if (data.isSuccess) {
              Swal.fire(data.message, "", "success");
              this.isActive = false;
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

    this.submitted = true;
  }

  files: File[] = [];

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  toBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    })
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  getItemFormControls(): AbstractControl[] {
    return (<UntypedFormArray>this.userForm.get('sizes')).controls
  }

  createitem() {
    if (this.itemData.valid) {
    }
    this.submitted = true;
  }
  changeprice(event: any) {
    this.selectedcategory = event.target.closest('span')?.innerHTML
  }

  // Add Item
  addItem(): void {
    (this.userForm.get('sizes') as UntypedFormArray).push(
      this.formBuilder.control(null)
    );
  }

  // Delete Item
  removeItem(index: any) {
    (this.userForm.get('sizes') as UntypedFormArray).removeAt(index);
  }

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
