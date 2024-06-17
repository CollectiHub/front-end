import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
  standalone: true,
  imports: [HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CollectionPage {}
