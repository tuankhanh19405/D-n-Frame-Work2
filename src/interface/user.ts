export interface IUser{
    id:number|string,
    name : string,
    email : string,
    phone : string,
    password : string ,
    role: string,
}

export interface IRegister extends IUser{
    repassword? : string
}

export type IRegisterForm = Omit<IRegister,"id">
export type ILoginForm = Pick<IUser,"email"|"password">
