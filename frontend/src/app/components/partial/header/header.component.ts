import { user } from './../../../shared/models/user';
import { UserService } from 'src/app/services/user.service';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartQuantity= 0;
  User!:user;

  constructor(CartService:CartService,private userService:UserService) {
    CartService.getCartObs().subscribe((newCart)=>{
      this.cartQuantity = newCart.totalCount
    })
    userService.userObservable.subscribe((newUser )=> {

      this.User = newUser;
    })

   }

  ngOnInit(): void {
  }
    logout(){
      this.userService.logout();
    }

    get isAuth(){
      return this.User.token;
    }


}
