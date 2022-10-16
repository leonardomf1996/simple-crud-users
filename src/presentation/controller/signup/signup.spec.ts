import { InvalidParamError, MissingParamError } from "../../errors";
import { SignUpController } from "./signup";

interface SutType {
   sut: SignUpController;
}

const makeSut = (): SutType => {
   const sut = new SignUpController();

   return {
      sut
   }
}

describe('SignUp Controller', () => {
   test('Should return 400 if no name is provided', async () => {
      const { sut } = makeSut()

      const httpRequest = {
         body: {
            email: 'any_email@mail.com',
            password: 'any_password',
            passwordConfirmation: 'any_password',
         }
      };

      const httpResponse = await sut.execute(httpRequest);

      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body).toEqual(new MissingParamError('name'));
   })

   test('Should return 400 if no email is provided', async () => {
      const { sut } = makeSut()

      const httpRequest = {
         body: {
            name: 'any_name',
            password: 'any_password',
            passwordConfirmation: 'any_password',
         }
      };

      const httpResponse = await sut.execute(httpRequest);

      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body).toEqual(new MissingParamError('email'));
   })

   test('Should return 400 if no password is provided', async () => {
      const { sut } = makeSut()

      const httpRequest = {
         body: {
            name: 'any_name',
            email: 'any_email@mail.com',
            passwordConfirmation: 'any_password',
         }
      };

      const httpResponse = await sut.execute(httpRequest);

      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body).toEqual(new MissingParamError('password'));
   })

   test('Should return 400 if no password confirmation is provided', async () => {
      const { sut } = makeSut()

      const httpRequest = {
         body: {
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'any_password',
         }
      };

      const httpResponse = await sut.execute(httpRequest);

      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'));
   })

   test('Should return 400 if password confirmation fails', async () => {
      const { sut } = makeSut()

      const httpRequest = {
         body: {
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'any_password',
            passwordConfirmation: 'invalid_password',
         }
      };

      const httpResponse = await sut.execute(httpRequest);

      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'));
   })
})