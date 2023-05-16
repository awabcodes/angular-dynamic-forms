import { Injectable } from '@angular/core';
import {
  FormSchemaItem,
  FormSchemaValidator,
  FormSchemaValidatorTypes,
  FormSchemaItemAndControl,
} from './form.model';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  formSchema: FormSchemaItem[] = [
    {
      key: 'name',
      name: 'Full Name',
      value: '',
      type: 'text',
      validators: [
        {
          type: FormSchemaValidatorTypes.REQUIRED,
        },
        {
          type: FormSchemaValidatorTypes.MAX_LENGTH,
          argument: 25,
        },
        {
          type: FormSchemaValidatorTypes.MIN_LENGTH,
          argument: 3,
        },
      ],
    },
    {
      key: 'age',
      name: 'Age',
      value: '',
      type: 'number',
      validators: [
        {
          type: FormSchemaValidatorTypes.REQUIRED,
        },
        {
          type: FormSchemaValidatorTypes.MAX,
          argument: 60,
        },
        {
          type: FormSchemaValidatorTypes.MIN,
          argument: 18,
        },
      ],
    },
    {
      key: 'email',
      name: 'Email',
      value: '',
      type: 'email',
      validators: [
        {
          type: FormSchemaValidatorTypes.REQUIRED,
        },
        {
          type: FormSchemaValidatorTypes.EMAIL,
        },
      ],
    },
    {
      key: 'phoneNumber',
      name: 'Phone Number',
      value: '',
      type: 'number',
      validators: [
        {
          type: FormSchemaValidatorTypes.REQUIRED,
        },
        {
          type: FormSchemaValidatorTypes.PATTERN,
          argument: /\d/,
        },
      ],
    },
    {
      key: 'address',
      name: 'Full Address',
      value: '',
      type: 'text',
      validators: [
        {
          type: FormSchemaValidatorTypes.PATTERN,
          argument: /[a-z]/,
        },
        {
          type: FormSchemaValidatorTypes.MAX_LENGTH,
          argument: 100,
        },
      ],
    },
    {
      key: 'date',
      name: 'Date',
      value: '',
      type: 'date',
      validators: [],
    },
  ];

  constructor(private fb: UntypedFormBuilder) {}

  createFormControls(schema: FormSchemaItem[]): FormSchemaItemAndControl[] {
    const formSchemaWithControls = schema.map((item) => {
      return {
        item: item,
        control: this.fb.control(
          item.value,
          this.loadValidators(item.validators)
        ),
      };
    });

    return formSchemaWithControls;
  }

  loadValidators(validators: FormSchemaValidator[]): any {
    const validations = validators.map((element) => {
      if (element.argument) {
        return Validators[element.type](element.argument);
      }

      return Validators[element.type];
    });

    return validations;
  }

  createFormGroup(
    formSchemaWithControls: FormSchemaItemAndControl[]
  ): UntypedFormGroup {
    const form = this.fb.group({});

    formSchemaWithControls.forEach((item) => {
      form.addControl(item.item.key, item.control);
    });

    return form;
  }
}
