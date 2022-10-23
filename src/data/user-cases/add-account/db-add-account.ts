import { AccountModel, Encrypter, AddAccountModel, AddAccountRepository, AddAccount } from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
   constructor(
      private readonly encrypter: Encrypter,
      private readonly addAccountRepository: AddAccountRepository,
   ) { }

   async save(account: AddAccountModel): Promise<AccountModel> {
      const hashed_password = await this.encrypter.encrypt(account.password);
      const newAccount = await this.addAccountRepository.save(Object.assign({}, account, { password: hashed_password }));

      return newAccount;
   }

}