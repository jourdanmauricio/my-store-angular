import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = 'https://picsum.photos/200';
  token: string = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  onLoaded(imgUrl: string) {
    console.log('LOG EN PADRE', imgUrl);
  }

  createUser() {
    this.usersService
      .create({
        name: 'Catalina',
        email: 'catalina@gmail.com',
        password: '121212',
      })
      .subscribe((rta) => {
        console.log('Rta', rta);
      });
  }

  // login() {
  //   this.authService.login('catalina@gmail.com', '121212').subscribe((rta) => {
  //     this.token = rta.access_token;
  //   });
  // }

  // getProfile() {
  //   this.authService.profile(this.token).subscribe((profile) => {
  //     console.log('profile', profile);
  //   });
  // }
}
