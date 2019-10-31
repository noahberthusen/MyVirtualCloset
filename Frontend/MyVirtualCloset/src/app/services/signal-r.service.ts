import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: HubConnection;

  constructor(private toastr: ToastrService) { }

  public startConnection() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isLoggedIn = currentUser && currentUser.token;
    //const isApiUrl = request.url.startsWith(config.apiUrl);
    if (isLoggedIn) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:44383/hub', {
          accessTokenFactory: () => currentUser.token
        })
        .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err));
    }

    this.hubConnection.on('notification', (payload) => {
      this.toastr.info(payload);
    })
  }

  public endConnection() {

  }

  public sendNotification(user: string, message: string) {
    console.log("here");
    this.hubConnection.invoke('Send', "noah", "hello!");
  }
}
