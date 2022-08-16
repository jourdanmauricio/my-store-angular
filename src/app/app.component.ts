import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  imgParent = 'https://picsum.photos/200';
  token: string = '';
  imgRta = '';

  constructor(
    private filesService: FilesService,
    private usersService: UsersService,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getProfile().subscribe();
    }
  }

  onLoaded(imgUrl: string) {
    console.log('LOG EN PADRE', imgUrl);
  }

  createUser() {
    this.usersService
      .create({
        name: 'Catalina',
        email: 'catalina@gmail.com',
        password: '121212',
        role: 'customer',
      })
      .subscribe((rta) => {
        console.log('Rta', rta);
      });
  }

  downloadPdf() {
    this.filesService
      .getFile(
        'my.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file).subscribe((rta) => {
        this.imgRta = rta.location;
      });
    }
  }
}
