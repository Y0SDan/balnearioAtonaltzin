export class Cliente{
    ID_Cliente: number;
    Nombre : string;
    Apellido:string;
    Email: string;
    password1: string;
    Telefono: string;
    tipo:string;
    foto: number;

    constructor() {
        this.ID_Cliente = 0;
        this.Nombre = '';
        this.Apellido = '';
        this.Email = 'marcos@gmail.com';
        this.password1 = 'hola';
        this.Telefono = '';
        this.tipo = ''; //No cambiar que afecta a un select
        this.foto = 0;
    }
}