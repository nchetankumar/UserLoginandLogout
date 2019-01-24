import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  
  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
  	//this.resetForm();
  }
  /*resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {     
      Email: ''     
    }
  }*/
  OnSubmit(form: NgForm) {
    this.userService.forgotUser(form.value)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          //this.resetForm(form);
          this.toastr.success('Reset email sent successfully',form.value);
        }
        else
          this.toastr.error(data.Errors[0]);
      });
  }

}
