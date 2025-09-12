import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RolesComponent } from "./roles/roles.component";
import { AddRolesComponent } from "./add-roles/add-roles.component";

const routes: Routes = [
    {
        path: 'roles', component: RolesComponent
    },
    {
        path: 'newRoles', component: AddRolesComponent
    },
    {
        path: 'editRoles', component: AddRolesComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoleRoutingModule { }