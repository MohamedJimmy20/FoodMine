import { IUserRegister } from './../shared/interfaces/IUserRegister';
import { USER_LOGIN_URL, USER_REGISTER_URL } from './../shared/constants/urls';
import { IUserLogin } from './../shared/interfaces/IUserLogin';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import {user} from '../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

const USER_KEY = 'user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject =
   new BehaviorSubject<user>(this.getUserFromLocalStorage());
  public userObservable: Observable<user>;
  constructor(private http: HttpClient, private toastrServise: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
   }

   public get currentUser(): user {
    return this.userSubject.value;

   }

   login(userLogin: IUserLogin):Observable <user>{
    return this.http.post<user>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (User) =>{
          this.setUserToLocalStorate(User);
          this.userSubject.next(User);
          this.toastrServise.success(
            `Welcome To foodmine ${User.name}!`,
            "Login Successful"
          )
        },
        error: (errorResponse)=>{
          this.toastrServise.error(errorResponse, 'Login Failed');

        }
      })
    )
   };

   register(userRegister: IUserRegister): Observable<user>{
    return this.http.post<user>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (User) =>{
          this.setUserToLocalStorate(User);
          this.userSubject.next(User);
          this.toastrServise.success(
            `Welcome to the Foodmine ${User.name}`,
            'Register Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrServise.error(errorResponse.error,
            'Register Failed');

        }
      })
    )
   }



   logout(){
    this.userSubject.next(new user());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
   }

   private setUserToLocalStorate(User:user){
    localStorage.setItem(USER_KEY, JSON.stringify(User));

   }

   private getUserFromLocalStorage(): user{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as user;
    return new user();
   }

}
