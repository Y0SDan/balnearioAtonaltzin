export class Cliente{
    ID_Cliente: number;
    Nombre : string;
    Apellido:string;
    Email: string;
    password1: string;
    Telefono: string;
    tipo:string;

    constructor() {
        this.ID_Cliente = 0;
        this.Nombre = '';
        this.Apellido = '';
        this.Email = 'marcos@gmail.com';
        this.password1 = 'hola';
        this.Telefono = '';
        this.tipo = 'usuario';
    }
}