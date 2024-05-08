import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, input, signal } from '@angular/core';
import { UsersApiService } from '@features/users/services/users-api.service';
import { IonicModule } from '@ionic/angular';
import { LetDirective } from '@ngrx/component';
import { take } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, LetDirective],
})
export default class VerifyEmailPage implements OnInit {
  private readonly usersApiService = inject(UsersApiService);

  code = input.required<string>();

  isVerified = signal<boolean | undefined>(undefined);

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
