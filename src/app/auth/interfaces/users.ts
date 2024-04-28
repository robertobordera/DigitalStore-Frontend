export interface Users {
   id?: number;
   nombre: string;
   password?: string;
   correo: string;
   calle:string;
   numeroCalle:string;
   codigoPostal:string;
   provincia:string
   lat?: number;
   lng?: number;
   
}


export interface UserLogin {
    correo: string;
    password: string;
    lat?: number;
    lng?: number;
}


export interface UserProfileEdit {
    name?: string;
    email?: string;
}

export interface UserAvatarEdit {
    avatar?: string;
}

export interface UserPasswordEdit {
    password?: string;
}
