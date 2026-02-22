import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-user',
  imports: [],
  templateUrl: './single-user.html',
  styleUrl: './single-user.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleUser {
  @Input() name: string = '';
}
