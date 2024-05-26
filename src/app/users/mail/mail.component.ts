import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { Users, mail } from '../../auth/interfaces/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mail',
  standalone: true,
  imports: [],
  templateUrl: './mail.component.html',
  styleUrl: './mail.component.scss'
})
export class MailComponent implements OnInit{

  #userService = inject(UserService);
  #router = inject(Router);

  usuarioMe?:Users
  mails:mail[] = [];
  mails2:mail[] = [];

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
        this.#userService.mostrarMensajes2(this.usuarioMe?.id ?? 0).subscribe({
          next:(mail)=>{
            console.log(mail)
            this.mails2 = mail
          }
        })
      }
    })
  }

  valoracion(id_producto:number,id_receptor:number){
    this.#router.navigate(['/user/resenya'], { queryParams: { id_producto: id_producto, id_enviador: this.usuarioMe?.id, id_receptor:  id_receptor} });
  }

}
