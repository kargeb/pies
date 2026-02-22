import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { User } from '../../../../core/models/users.model';

@Component({
  selector: 'app-single-user',
  imports: [],
  templateUrl: './single-user.html',
  styleUrl: './single-user.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleUser {
  @Input() user?: User;
  @Output() onUserClick = new EventEmitter<string>();

  public showDetail(id: string): void {
    this.onUserClick.emit(id);
  }
}
