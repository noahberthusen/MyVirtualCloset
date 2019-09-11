import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'experiment';

  constructor(private http: HttpClient) {}

  sendPicture(event) {
    const file = event.target.files[0];

    const uploadForm = new FormData();
    uploadForm.append('picture', file, file.name);
    this.http.get('https://localhost:44340/api/values')
    .subscribe((res) => {
      console.log(res);
    })
  }
}

