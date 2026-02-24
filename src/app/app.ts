import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { LoaderService } from './core/services';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private router = inject(Router);
  public readonly loaderService = inject(LoaderService);

  protected readonly title = signal<string>('pies');
  public subtitle: string = 'regular variable';

  constructor() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loaderService.hide();
      }
    });
  }

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
