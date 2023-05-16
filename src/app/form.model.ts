import { FormControl } from '@angular/forms';

export type FormSchemaItemAndControl = {
  item: FormSchemaItem;
  control: FormControl;
};

export type FormSchemaItem = {
  key: string;
  name: string;
  value: any;
  type: 'text' | 'number' | 'tel' | 'email' | 'date';
  validators: FormSchemaValidator[];
};

export type FormSchemaValidator = {
  type: FormSchemaValidatorTypes;
  argument?: any;
};

export enum FormSchemaValidatorTypes {
  REQUIRED = 'required',
  MAX = 'max',
  MIN = 'min',
  MAX_LENGTH = 'maxLength',
  MIN_LENGTH = 'minLength',
  EMAIL = 'email',
  PATTERN = 'pattern',
}
