import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonIcon, IonInput } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { closeCircleOutline, searchOutline } from 'ionicons/icons';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [IonIcon, IonInput, TranslateModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  control = new FormControl('', { nonNullable: true });

  constructor() {
    addIcons({ searchOutline, closeCircleOutline });
  }

  searchTerm$(): Observable<string> {
    return this.control.valueChanges.pipe(map(value => value.trim()));
  }

  clearInput(): void {
    this.control.reset();
  }
}
