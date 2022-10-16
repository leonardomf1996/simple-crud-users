import { AccountModel } from "../models/account";

export interface AddAccountModel {
   name: string;
   email: string;
   password: string;
}

export interface AddAccount {
   save(account: AddAccountModel): Promise<AccountModel>
}