import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  age = 1;
  newPasswordVB='';

  sidenavOpened = true;

  constructor(private http: HttpClient) {}

  public onKeyUp($event: any): void {
  	this.title = $event.target.value;
  }
 

  public onChange(event: any): void {
    console.log(event);
  }

  public onSubmitPasswordVB(): void {
    console.log(this.newPasswordVB);

    //sur le VB: http://virtualskin.localhost:8000/brain/password
    this.http.put(
      'http://localhost:3000/brain/password',
      {
        password: this.newPasswordVB
      },
      { observe: 'response' }
    ).subscribe(data => {
      console.log(data);
    });
  }
}
