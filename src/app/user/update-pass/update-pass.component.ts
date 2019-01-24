import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-update-pass',
  templateUrl: './update-pass.component.html',
  styleUrls: ['./update-pass.component.css']
})
export class UpdatePassComponent implements OnInit {
isPasswordDontMatch : boolean = false;
emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService : UserService,private toastr: ToastrService) { }

  ngOnInit() {
  }
   OnSubmit(newPassword,confirmPwd) {
   	if (newPassword !== confirmPwd) {
	    //this.resetForm(form);
	    this.isPasswordDontMatch = true;	    
	}else{
		this.userService.updatePWD(newPassword,confirmPwd)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          //this.resetForm(form);
          this.toastr.success('Password reset successful');
        }
        else
          this.toastr.error(data.Errors[0]);
      });
	}
    
  }
}
