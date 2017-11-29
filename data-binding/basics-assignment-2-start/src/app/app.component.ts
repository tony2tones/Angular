import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userName = '';
  userNameToParagraph = '';
  buttonStatus = false;

  createUserName() {
   this.userNameToParagraph = this.userName;
   this.userName = '';
   this.buttonStatus = false;
  }

}
