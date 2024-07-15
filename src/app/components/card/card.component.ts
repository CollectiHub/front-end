import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IonCard, IonCardContent, IonCheckbox, IonLabel, IonSpinner } from '@ionic/angular/standalone';
import { Card, CardStatus } from '@models/collection.models';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, IonLabel, IonCard, IonCardContent, IonCheckbox, IonSpinner],
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
