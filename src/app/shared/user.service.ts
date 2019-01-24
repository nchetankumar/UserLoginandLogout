import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://env-dev.5ytif5ffzs.ap-south-1.elasticbeanstalk.com/';
  isLoginError : boolean = false;
  constructor(private http: HttpClient,private router : Router) { }

  registerUser(user: User) {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + 'auth/sign_in/', body,{headers : reqHeader});
  }
  userAuthentication = (userName, password) => {
    /*const data = {
      email : userName,
      password : password
    }*/
    //const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    
    return this.http.post(this.rootUrl+'auth/sign_in',{
      email : userName,
      password : password
    })
    .map((data : any)=>{
        localStorage.setItem('userToken',data.access_token);
        this.router.navigate(['/home']);
      },
      (err : HttpErrorResponse)=>{
        this.isLoginError = true;
      });
    }

  /*userAuthentication(userName, password) {
    var data = "?email=" + userName+"&password="+password;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl+'auth/sign_in', data ,reqHeader);
  }*/
  forgotUser = (email) =>{
     return this.http.post(this.rootUrl+'auth/sign_in',{
      email : email      
    })
  }
  updatePWD = (newPassword,confirmPwd)  => {
    return this.http.post(this.rootUrl+'auth/sign_in',{
      password : newPassword,
      password_confirmation :confirmPwd      
    })
  }
  getUserClaims(){
   return  this.http.get(this.rootUrl+'/api/GetUserClaims');
  }

}
