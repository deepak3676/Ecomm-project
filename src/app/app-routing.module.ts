import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { HeaderComponent } from './header/header.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';


const routes: Routes = [
  {path:'my-orders',component:MyOrdersComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'cart-page',component:CartPageComponent},
  {path:'user-auth',component:UserAuthComponent},
  {path:'product-details/:productId',component:ProductDetailsComponent},
  {path:'search/:query',component:SearchComponent},
  {path:'seller-add-product',component:SellerAddProductComponent,canActivate:[AuthGuard]},
  {path: '',component: HomeComponent},
  {path: 'seller-update-product/:id', component: SellerUpdateProductComponent,canActivate:[AuthGuard]},
  {path:'seller-home',component:SellerHomeComponent,canActivate:[AuthGuard]},
    { path: 'seller-auth', component: SellerAuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
