import { Component, OnInit } from '@angular/core';
import { cart, logIn, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogIN: boolean = true;
  authError: string = "";
  constructor(private user: UserService, private product: ProductService) { }
  ngOnInit(): void {
    this.user.userAuthLoad();
  }

  signUp(data: signUp) {
    this.user.userSignUp(data)
  }
  logIn(data: logIn) {
    this.user.userLogIn(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = "Please enter valid details"
      }
      else {
        this.localCartToRemoteCart();
      }
    })
  }
  openSignUp() {
    this.showLogIN = false;
  }
  openLogin() {
    this.showLogIN = true;
  }
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId= user && JSON.parse(user).id;
    if(data){
     let cartDataList:product[]= JSON.parse(data);
   
     cartDataList.forEach((product:product, index)=>{
       let cartData:cart={
         ...product,
         productId:product.id,
         userId
       }
       delete cartData.id;
       setTimeout(() => {
         this.product.addToCart(cartData).subscribe((result)=>{
           if(result){
             console.warn("data is stored in DB");
           }
         })
       }, 500);
       if(cartDataList.length===index+1){
         localStorage.removeItem('localCart')
       }
     })
    }
    setTimeout(()=>{
      this.product.getCartList(userId)
    },2000)
    
  }
}
