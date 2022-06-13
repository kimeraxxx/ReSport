import { Pista } from './Pista';
export interface Usuario {
    uid: string;
    nombre: string;
    apellido: string;
    telefono: number;
    email: string;
    contrasena: string;
    ciudad: string;
    reserva: Pista;
    hora: string;
}
