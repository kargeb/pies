import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetails {
  private readonly activatedRoute = inject(ActivatedRoute);

  public userId?: number;

  private paramsSignal = toSignal(this.activatedRoute.paramMap);

  public userId2: Signal<number> = signal(0);

  public constructor() {
    effect(() => {
      this.userId = Number(this.paramsSignal()?.get('id'));
    });
  }

  public ngOnInit(): void {
    // this.userId = Number(this.paramsSignal()?.get('id'));
    this.userId2 = computed(() => Number(this.paramsSignal()?.get('id')));
    console.log('userId: ', this.userId);
  }

  private getIdBySubscribe() {
    this.activatedRoute.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe((params) => {
        this.userId = Number(params.get('id'));
        console.log('userId: ', this.userId);
      });
  }

  public ngOnDestroy() {}
}
