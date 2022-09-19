import { Router } from '@angular/router';
import { OrderService } from './../../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from './../../../shared/models/Order';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;
  constructor(
    cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toatsrService: ToastrService,
    private orderService: OrderService,
    private router: Router
  ) {
    const cart = cartService.getCard();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice

  }

  ngOnInit(): void {

    let {name, address} = this.userService.currentUser
     this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required]

     });
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
       this.toatsrService.warning('Please fill the inputs', 'Invalid Inputs')
       return;
    }
    if(!this.order.addressLatLng){
      this.toatsrService.warning('Please select your location on map', 'Location')
      return;
   }

    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    this.orderService.create(this.order).subscribe({
      next:() => {
        this.router.navigateByUrl('/payment')
      },
      error: (errorRespone) => {
        this.toatsrService.error(errorRespone.error, 'Cart')
      }
    })

  }

}
