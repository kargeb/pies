import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, of, Subscription, switchMap, take, tap } from 'rxjs';
import { UsersService } from '../../../../core/services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetails {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);
  private usersService = inject(UsersService);
  private subscription: Subscription = new Subscription();

  public userId?: string | null;

  public userDetails = signal({});

  private paramsSignal = toSignal(this.activatedRoute.paramMap);

  // private observableParams?: Observable<ParamMap> = this.activatedRoute.paramMap;

  public userId2: Signal<number> = signal(0);

  public constructor() {
    effect(() => {
      this.userId = this.paramsSignal()?.get('id');
    });
  }

  public ngOnInit(): void {
    // this.userId = Number(this.paramsSignal()?.get('id'));
    // this.userId2 = computed(() => Number(this.paramsSignal()?.get('id')));
    console.log('userId: ', this.userId);
    this.subscription.add(
      this.activatedRoute.params
        .pipe(
          map((params) => {
            console.log('params from map:', params);
            this.userId = params['id'];
            console.log('this.userrr: ', this.userId);
            this.cdr.markForCheck();
            return this.userId;
            // return of(this.userId);
          }),
          switchMap((userIdObserv) => {
            // const valueFromObservable = toSignal(userIdObserv);

            console.log('signal value from obserab+le: ', userIdObserv);

            if (!userIdObserv) {
              throw Error('NO ID in the component');
            }

            this.usersService.getUserDetails(userIdObserv).subscribe({
              next: (user) => {
                this.userDetails.set(user);
              },
              error: (err) => {
                console.log('err: ', err);
              },
            });

            // console.log(
            //   'userIdObserv: ',
            //   userIdObserv
            //     .pipe(
            //       take(1),
            //       tap((value) => {
            //         console.log('Value from obsevable:', value);
            //       }),
            //     )
            //     .subscribe(),
            // );
            return of(userIdObserv);
          }),
        )
        .subscribe(),
    );
  }

  // private getIdBySubscribe() {
  //   this.activatedRoute.paramMap
  //     .pipe(takeUntilDestroyed())
  //     .subscribe((params) => {
  //       this.userId = Number(params.get('id'));
  //       console.log('userId: ', this.userId);
  //     });
  // }

  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
