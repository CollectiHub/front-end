import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersApiService } from '@features/users/services/users-api.service';
import { IonButton, IonContent, IonIcon, IonText } from '@ionic/angular/standalone';
import { LetDirective } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, closeCircleOutline, mailOutline } from 'ionicons/icons';
import { take } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonIcon, IonText, IonButton, IonContent, CommonModule, LetDirective, TranslateModule, RouterLink],
})
export default class VerifyEmailPage implements OnInit {
  private readonly usersApiService = inject(UsersApiService);

  code = input.required<string>();

  isVerified = signal<boolean | undefined>(undefined);

  constructor() {
    addIcons({ mailOutline, checkmarkCircleOutline, closeCircleOutline });
  }

  ngOnInit(): void {
    this.usersApiService
      .verifyEmail$(this.code())
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isVerified.set(true);
        },
        error: () => {
          this.isVerified.set(false);
        },
      });
  }
}
