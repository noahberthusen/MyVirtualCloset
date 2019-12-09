import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanionService {

  constructor( private http: HttpClient) { }

  getAllCompanions(currentUser: string) {
    const formData = new FormData();

    formData.append('user', currentUser);
    return this.http.post<any[]>('https://localhost:44383/api/Companion/all', formData)
    .pipe(map(res => {
      let companions: User[] = [];

      res.forEach(obj => {
        let temp = new User();
        temp.id = obj.id;
        temp.username = obj.username;
        console.log(temp);
        companions.push(temp);
      });
      return companions;
    }));
  }

}
