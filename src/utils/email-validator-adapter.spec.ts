import validator from 'validator';
import { EmailValidatorAdapter } from './email-validator-adapter';

jest.mock('validator', () => ({
   isEmail(): boolean {
      return true;
   }
}))

const makeSut = (): EmailValidatorAdapter => {
   return new EmailValidatorAdapter();
}

describe('EmailValidator', () => {
   test('should return false if validator returns false', () => {
      const sut = makeSut();

      jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);

      const isValid = sut.isValid('invalid_email@mail.com');
      expect(isValid).toBe(false);
   });
});