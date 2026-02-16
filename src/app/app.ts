import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  protected readonly title = signal<string>('pies');
  public subtitle: string = 'regular variable';

  public ngOnInit(): void {
    console.log('start');

    setTimeout(() => {
      console.log('set timeout');
      // this.title.set('czosz');
      this.subtitle = 'changed';
      this.cdr.markForCheck();
    }, 3000);
  }
}
