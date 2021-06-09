

export class Usuario {
    id: any;
    categoria: string; //Puede ser paciente, especialista, admin
    habilitado: boolean;
    nombre: string;
    apellido: string;
    edad: number;
    dni: number;
    obraSocial: string;
    especialidad  = []; //Agregado (solo en caso de ser especialista)
    mail: string;
    pass: any;
    fotoUno: any;
    fotoDos: any;
}
