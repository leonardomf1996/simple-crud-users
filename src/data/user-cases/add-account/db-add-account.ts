import { AccountModel } from "../../../domain/models/account";
import { AddAccount, AddAccountModel } from "../../../domain/use-cases/add-account";
import { Encrypter } from "../../protocols/encrypter";

export class DbAddAccount implements AddAccount {
   constructor(
      private readonly encrypter: Encrypter,
   ) { }

   async save(account: AddAccountModel): Promise<AccountModel> {
      const hashed_password = await this.encrypter.encrypt(account.password);

      return new Promise(resolve => resolve({
         id: 'valid_id',
         name: 'valid_name',
         email: 'valid_email@mail.com',
         password: hashed_password
      }))

   }

}