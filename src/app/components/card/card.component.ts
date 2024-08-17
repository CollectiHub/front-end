import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCheckbox, IonLabel, IonSpinner } from '@ionic/angular/standalone';
import { Card, CardStatus } from '@models/collection.models';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, IonLabel, IonCard, IonCardContent, IonCheckbox, IonSpinner, ReactiveFormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  readonly status = CardStatus;

  card = input.required<Card>();
  isLoading = input.required<boolean>();

  clickCard = output<string>();
  clickCheckbox = output<string>();

  cardCheckboxControl = new FormControl();
  cardCheckboxValueChange = toSignal(this.cardCheckboxControl.valueChanges);

  constructor() {
    effect(() => {
      this.cardCheckboxControl.setValue(this.card().status === CardStatus.Collected, { emitEvent: false });
    });

    effect(() => {
      this.clickCheckbox.emit(this.cardCheckboxValueChange());
    });
  }

  handleCardClick(cardId: string): void {
    this.clickCard.emit(cardId);
  }

  handleCheckboxClick(event: MouseEvent, cardId: string): void {
    event.stopPropagation();

    this.clickCheckbox.emit(cardId);
  }

  handleImageLoadError(event: ErrorEvent): void {
    const target = event.target as HTMLImageElement;

    target.src = 'assets/img/card-load-failed.jpg';
  }
}
