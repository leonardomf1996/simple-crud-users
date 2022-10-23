import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Encrypter } from "./db-add-account-protocols";
import { DbAddAccount } from "./db-add-account";

interface SutTypes {
   sut: DbAddAccount;
   encrypterStub: Encrypter;
   addAccountRepositoryStub: AddAccountRepository;
}

const makeEncrypter = (): Encrypter => {
   class EncrypterStub implements Encrypter {
      async encrypt(value: string): Promise<string> {
         return new Promise(resolve => resolve('hashed_password'))
      }
   }
   return new EncrypterStub();
}

const makeAddAccountRepository = (): AddAccountRepository => {
   class AddAccountRepositoryStub implements AddAccountRepository {
      async save(accountData: AddAccountModel): Promise<AccountModel> {
         const fakeAccount = {
            id: 'valid_id',
            name: 'valid_name',
            email: 'valid_email@mail.com',
            password: 'hashed_password',
         }

         return new Promise(resolve => resolve(fakeAccount));
      }
   }

   return new AddAccountRepositoryStub();
}

const makeSut = (): SutTypes => {
   const encrypterStub = makeEncrypter();
   const addAccountRepositoryStub = makeAddAccountRepository();
   const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);

   return {
      sut,
      encrypterStub,
      addAccountRepositoryStub
   }
}

describe('DbAddAccount use case', () => {
   test('should calls Encrypter with correct password', async () => {
      const { sut, encrypterStub } = makeSut();

      const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

      const accountData = {
         name: 'valid_name',
         email: 'valid_email@mail.com',
         password: 'valid_password',
      }

      await sut.save(accountData);

      expect(encryptSpy).toHaveBeenCalledWith('valid_password');
   });

   test('should throw if Encrypter throws', async () => {
      const { sut, encrypterStub } = makeSut();

      jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => {
         reject(new Error());
      }));

      const accountData = {
         name: 'valid_name',
         email: 'valid_email@mail.com',
         password: 'valid_password',
      }

      const promise = sut.save(accountData);

      await expect(promise).rejects.toThrow();
   });

   test('should call AddAccountRepository with correct values', async () => {
      const { sut, addAccountRepositoryStub } = makeSut();

      const saveSpy = jest.spyOn(addAccountRepositoryStub, 'save')

      const accountData = {
         name: 'valid_name',
         email: 'valid_email@mail.com',
         password: 'valid_password',
      }

      await sut.save(accountData);

      await expect(saveSpy).toHaveBeenCalledWith({
         name: 'valid_name',
         email: 'valid_email@mail.com',
         password: 'hashed_password',
      })
   });

});