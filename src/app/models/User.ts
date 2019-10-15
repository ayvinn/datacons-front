export class User {
   	public idUser: number ;
    public fullName: string;
    public loginUser: string;
    public passUser: string;
    public roleUser: string;
    public email: string;
    
    constructor(id?: number, fullName?: string,login?: string,pass?: string,role?: string,email?:string){
        this.idUser = id;
        this.fullName = fullName;
        this.loginUser = login;
        this.passUser = pass;
        this.roleUser = role;
        this.email = email;
    }
}