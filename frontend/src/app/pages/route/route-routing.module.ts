import { RouterModule, Routes } from "@angular/router";
import { RoutesComponent } from "./routes/routes.component";
import { NgModule } from "@angular/core";

const routes: Routes =[
    {
        path: 'mis-rutas',
        component: RoutesComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RutaRoutingModule { }