import { NgModule } from "@angular/core";
import { AddRoutesComponent } from "./add-routes/add-routes.component";
import { RoutesComponent } from "./routes/routes.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbNavModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDropzoneModule } from "ngx-dropzone";

@NgModule({
    declarations: [
        AddRoutesComponent,
        RoutesComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgbNavModule,
        NgbTooltipModule,
        NgxDropzoneModule
    ]
})
export class RutasModule { }