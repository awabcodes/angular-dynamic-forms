import { Component, OnInit } from '@angular/core';
import { FormService } from './form.service';
import { FormSchemaItemAndControl } from './form.model';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  formSchemaWithControls: FormSchemaItemAndControl[] = [];
  formGroup!: UntypedFormGroup;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formSchemaWithControls = this.formService.createFormControls(
      this.formService.formSchema
    );

    this.formGroup = this.formService.createFormGroup(
      this.formSchemaWithControls
    );
  }

  submit() {
    console.log(this.formGroup.value);
  }
}
