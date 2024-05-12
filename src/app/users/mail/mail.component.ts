import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { Users, mail } from '../../auth/interfaces/users';

@Component({
  selector: 'app-mail',
  standalone: true,
  imports: [],
  templateUrl: './mail.component.html',
  styleUrl: './mail.component.scss'
})
export class MailComponent implements OnInit{

  #userService = inject(UserService);
  usuarioMe?:Users
  mails:mail[] = [];

  ngOnInit(): void {

    this.#userService.obtenerMisDatos().subscribe({
      next:(user) => {
        this.usuarioMe = user
        console.log(this.usuarioMe)
        this.#userService.mostrarMensajes(this.usuarioMe?.id ?? 0).subscribe({
          next:(mail)=>{
            console.log(mail)
            this.mails = mail
          }
        })
      }
    })
  }

}
