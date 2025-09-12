import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbNavModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';

// page routing
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { CategoryComponent } from './category/category.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { IndexComponent } from './index/index.component';
import { AccountModule } from './account/account.module';

import { NgbRatingModule, NgbDropdownModule, NgbTooltipModule, NgbProgressbarModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

// scroll package
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleModule } from './roles/roles.module';
import { CategoryModule } from './categories/category.module';
import { RutasModule } from './route/route.module';

import { AuctionLiveComponent } from './auction-live/auction-live.component';

@NgModule({
  declarations: [
    CategoryComponent,
    RestaurantsComponent,
    IndexComponent,
    CartComponent,
    CheckoutComponent,
    AuctionLiveComponent,
    RestaurantsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    SlickCarouselModule,
    NgbNavModule,
    NgbRatingModule,
    NgbDropdownModule,
    NgbPagination,
    FormsModule,
    ReactiveFormsModule,
    AccountModule,
    RoleModule,
    CategoryModule,
    RutasModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    ScrollToModule.forRoot()
  ],
})
export class PagesModule { }
