import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://env-dev.5ytif5ffzs.ap-south-1.elasticbeanstalk.com/';
  constructor(private http: HttpClient) { }

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
    const data = "?email="+userName+"&password="+password;
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    console.log(this.http.post(this.rootUrl+'auth/sign_in',data));
    return this.http.post(this.rootUrl+'auth/sign_in',data);
  }
  /*userAuthentication(userName, password) {
    var data = "?email=" + userName+"&password="+password;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl+'auth/sign_in', data ,reqHeader);
  }*/

  getUserClaims(){
   return  this.http.get(this.rootUrl+'/api/GetUserClaims');
  }

}
