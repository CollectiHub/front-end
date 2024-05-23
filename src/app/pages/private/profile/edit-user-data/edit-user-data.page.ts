import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { RegularExpressions } from '@constants/regular-expressions';
import { IonButton, IonContent, IonInput, IonItem, IonList, NavController } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

import { EditUserDataForm } from './edit-user-data.models';
import { EditUserDataValidators } from './edit-user-data.validators';

@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.page.html',
  styleUrls: ['./edit-user-data.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonList,
    IonItem,
    IonButton,
    IonInput,
    TranslateModule,
    ReactiveFormsModule,
    RouterLink,
    HeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditUserDataPage {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly navController = inject(NavController);

  formInitialValue = {
    email: 'test@gg.gg',
    username: 'realhokage',
  };

  editUserDataForm = this.formBuilder.group<EditUserDataForm>(
    {
      email: this.formBuilder.control(this.formInitialValue.email, [
        Validators.required,
        Validators.pattern(RegularExpressions.email),
      ]),
      username: this.formBuilder.control(this.formInitialValue.username, Validators.required),
    },
    {
      validators: [EditUserDataValidators.someControlValueChanged(['email', 'username'], this.formInitialValue)],
    },
  );

  get emailControl(): FormControl<string | undefined> {
    return <FormControl<string | undefined>>this.editUserDataForm.get('email');
  }

  getEmailError(errors: ValidationErrors | null): string {
    return errors?.['required'] ? 'validation.required' : 'validation.invalid_email';
  }

  goToProfile(): void {
    this.navController.navigateBack('/profile');
  }
}
