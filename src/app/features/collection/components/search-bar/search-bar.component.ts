import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonSearchbar, SearchbarCustomEvent } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { closeCircleOutline, searchOutline } from 'ionicons/icons';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [IonSearchbar, TranslateModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  control = new FormControl('', { nonNullable: true });

  searchInput = output<string>();

  constructor() {
    addIcons({ searchOutline, closeCircleOutline });
  }

  handleSearchInput(event: SearchbarCustomEvent): void {
    const value = event.target.value as string;

    this.searchInput.emit(value.trim());
  }

  clearInput(): void {
    this.control.reset();

    this.searchInput.emit('');
  }
}
