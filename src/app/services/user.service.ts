import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { logIn, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  invalidUserAuth=new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {

  }
  userSignUp(user: signUp) {
    this.http.post('http://localhost:3000/users', user, { observe: 'response' }).subscribe((result) => {
      if (result) {
        
        localStorage.setItem('user', JSON.stringify(result.body))
        this.router.navigate(['/'])
      }
    })

  }
  userLogIn(data:logIn){
    this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe:'response'}
    ).subscribe((result)=>{
      if(result && result.body?.length){
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
        this.invalidUserAuth.emit(false)
      }else{
        this.invalidUserAuth.emit(true)
      }
    })
  }
  userAuthLoad() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
