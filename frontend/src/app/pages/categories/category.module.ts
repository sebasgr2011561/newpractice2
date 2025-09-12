import { NgModule } from "@angular/core";
import { CategoriesComponent } from "./categories/categories.component";
import { AddCategoriesComponent } from "./add-categories/add-categories.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbNavModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDropzoneModule } from "ngx-dropzone";
import { CategoryRoutingModule } from "./category-routing.module";


@NgModule({
    declarations: [
        AddCategoriesComponent,
        CategoriesComponent
    ],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgbNavModule,
        NgbTooltipModule,
        NgxDropzoneModule
    ]
})
export class CategoryModule { }