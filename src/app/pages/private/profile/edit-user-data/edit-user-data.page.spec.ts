import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { UsersStoreMock } from '@features/users/store/users.state.testing';
import { UsersStore } from '@features/users/store/users.store';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';

import EditUserDataPage from './edit-user-data.page';
import { EditUserDataValidators } from './edit-user-data.validators';

jest.mock('@angular/core', () => {
  const actual = jest.requireActual('@angular/core');

  return {
    ...actual,
    effect: (fn: any) => {
      fn();
    },
  };
});

describe(EditUserDataPage.name, () => {
  let component: EditUserDataPage;
  let formBuilderMock: MockProxy<NonNullableFormBuilder>;
  let usersStoreMock: MockProxy<UsersStoreMock>;
  let setValueSpy: jest.SpyInstance;
  let setValidatorsSpy: jest.SpyInstance;
  let someControlValueChangedSpy: jest.SpyInstance;
  const userDataWrapper = { userData: {} };

  const mockUndefinedUserData = () => {
    userDataWrapper.userData = undefined as any;
  };

  const restoreUserDataMock = () => {
    userDataWrapper.userData = { email: 'em', username: 'un' } as any;
  };

  beforeEach(() => {
    const formGroupMock = new FormGroup({
      username: new FormControl('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true }),
    }) as FormGroup;
    setValueSpy = jest.spyOn(formGroupMock, 'setValue');
    setValidatorsSpy = jest.spyOn(formGroupMock, 'addValidators');
    someControlValueChangedSpy = jest.spyOn(EditUserDataValidators, 'someControlValueChanged');

    formBuilderMock = mock<NonNullableFormBuilder>();
    formBuilderMock.group.mockReturnValue(formGroupMock);

    usersStoreMock = mock<UsersStoreMock>();
    usersStoreMock.userData.mockReturnValue(userDataWrapper.userData);

    component = classWithProviders({
      token: EditUserDataPage,
      providers: [
        {
          provide: NonNullableFormBuilder,
          useValue: formBuilderMock,
        },
        {
          provide: UsersStore,
          useValue: usersStoreMock,
        },
      ],
    });
  });

  describe('constructor', () => {
    describe('userData is not defined', () => {
      beforeAll(() => {
        mockUndefinedUserData();
      });

      afterAll(() => {
        restoreUserDataMock();
      });

      it('should not dispatch to form new value', () => {
        expect(setValueSpy).not.toHaveBeenCalled();
      });

      it('should not add validators to form', () => {
        expect(setValidatorsSpy).not.toHaveBeenCalled();
      });

      it('should not create "someControValueChanged" validator', () => {
        expect(someControlValueChangedSpy).not.toHaveBeenCalled();
      });
    });

    describe('userData is defined', () => {
      it('should dispatch to form new value of user data if it is defined', () => {
        expect(setValueSpy).toHaveBeenCalledWith({ email: 'em', username: 'un' });
      });

      it('should add validators, if user data defined', () => {
        expect(setValidatorsSpy).toHaveBeenCalledTimes(1);
      });

      it('should create "someControValueChanged" validator', () => {
        const targetFields = ['email', 'username'];
        const initalValueMock = { email: 'em', username: 'un' };

        expect(someControlValueChangedSpy).toHaveBeenCalledWith(targetFields, initalValueMock);
      });
    });
  });

  describe('updateUserData', () => {
    it('should trigger "updateUserData" method store', () => {
      component.updateUserData();

      expect(usersStoreMock.updateUserData).toHaveBeenCalledWith({ email: 'em', username: 'un' });
    });
  });
});
