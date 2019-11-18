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
    if (this.hubConnection) {
      this.hubConnection
        .stop()
        .then(() => console.log('Connection ended'))
        .catch(err => console.log('Error while ending connection: ' + err));
    }
  }

  public sendNotification(message: string, user: string) {
    // user must be the userId, i.e. 6b90b519-fd2e-4a85-9ef9-123f63feaf89
    // sends {{ message }} to {{ user }}. Like, comment, follow, etc.
    this.hubConnection.invoke('Send', message, user);
  }
}
