import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';
import EditProfileViewComponent from '@features/profile/components/edit-profile-view/edit-profile-view.component';
import ReadOnlyProfileViewComponent from '@features/profile/components/read-only-profile-view/read-only-profile-view.component';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [HeaderComponent, IonicModule, CommonModule, ReadOnlyProfileViewComponent, EditProfileViewComponent],
})
export default class ProfilePage {
  isEditMode = signal<boolean>(false);
}
