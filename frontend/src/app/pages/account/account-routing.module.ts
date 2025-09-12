import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { SettingComponent } from './setting/setting.component';
import { MyItemComponent } from './my-item/my-item.component';
import { MyCollectionComponent } from './my-collection/my-collection.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { NotificationComponent } from './notification/notification.component';
import { UsuariosComponent } from './Usuarios/usuarios.component';
import { crearUsuarioComponent } from './crearUsuario/crearUsuario.component';


import {AddproductComponent} from './addproduct/addproduct.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: 'editar', component: SettingComponent
  },
  {
    path: 'miscursos', component: MyItemComponent
  },
  {
    path: 'misrutas', component: MyCollectionComponent
  },
  {
    path: 'favorite', component: FavoriteComponent
  },
  {
    path: 'notification', component: NotificationComponent
  },
  {
    path: 'usuarios', component: UsuariosComponent
  },
  {
    path: 'crearUsuario', component: crearUsuarioComponent
  },
  {
    path: 'addproduct', component: AddproductComponent
  },
  {
    path: 'addproduct/:id', component: AddproductComponent
  },
  {
    path: 'product', component: ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
