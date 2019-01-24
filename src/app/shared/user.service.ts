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
  //var rootUrl = 'http://env-dev.5ytif5ffzs.ap-south-1.elasticbeanstalk.com/';
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
    return this.http.post('http://env-dev.5ytif5ffzs.ap-south-1.elasticbeanstalk.com/auth/sign_in/', body,{headers : reqHeader});
  }
  userAuthentication(userName, password) {
    var data = "email=" + userName+"password="+password;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post('http://env-dev.5ytif5ffzs.ap-south-1.elasticbeanstalk.com/auth/sign_in', {
      email: userName,
      password: password
    } ,{headers : reqHeader});
  }
  getUserClaims(){
   var reqHeader = new HttpHeaders({'No-Auth':'True'});
   return  this.http.get('http://env-dev.5ytif5ffzs.ap-south-1.elasticbeanstalk.com/api/GetUserClaims',{headers : reqHeader});
  }
  forgotUser(email){
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    var email = email;
    return this.http.post('http://env-dev.5ytif5ffzs.ap-south-1.elasticbeanstalk.com/auth/sign_in',email,{headers : reqHeader});
  }
  updatePWD(newPassword,confirmPwd){
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    var pwdData = "nPwd"+newPassword+"confirmPwd"+confirmPwd;   
    return this.http.put('http://env-dev.5ytif5ffzs.ap-south-1.elasticbeanstalk.com/auth/sign_in',pwdData,{headers : reqHeader});
  }
  userLogout(uid){
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    var uid = uid;
    return this.http.put('http://env-dev.5ytif5ffzs.ap-south-1.elasticbeanstalk.com/auth/sign_out',uid,{headers : reqHeader});
  }
}