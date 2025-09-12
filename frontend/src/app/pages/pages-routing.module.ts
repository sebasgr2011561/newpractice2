import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { IndexComponent } from './index/index.component';
import { CategoryComponent } from './category/category.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuctionLiveComponent } from './auction-live/auction-live.component';
import { RoutesComponent } from './route/routes/routes.component';
import { AddRoutesComponent } from './route/add-routes/add-routes.component';
import { RolesComponent } from './roles/roles/roles.component';
import { AddRolesComponent } from './roles/add-roles/add-roles.component';




const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'category/:id',
    component: CategoryComponent
  },
  {
    path: 'restaurants',
    component: RestaurantsComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'restaurants', component: RestaurantsComponent
  },
  {
    path: 'recurso/:id', 
    component: AuctionLiveComponent
  },
  {
    path: 'mis-rutas',
    component: RoutesComponent
  },
  {
    path: 'nueva-ruta',
    component: AddRoutesComponent
  },
  {
    path: 'editar-ruta/:id',
    component: AddRoutesComponent
  },
  {
    path: 'roles', component: RolesComponent
  },
  {
      path: 'newRoles', component: AddRolesComponent
  },
  {
      path: 'editRoles', component: AddRolesComponent
  },
  {
    path: 'dashboard', loadChildren: () => import('./sellerdashboard/sellerdashboard.module').then(m => m.SellerdashboardModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
