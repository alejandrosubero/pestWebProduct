import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),


    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        opacity: 0,
      }),
    ], { optional: true }),

    query(':enter', [style({ opacity: 0 })], { optional: true }),

    group([
      query(':leave', [
        animate('200ms ease-out', style({ opacity: 0 })),
      ], { optional: true }),

      query(':enter', [
        animate('200ms ease-in', style({ opacity: 1 })),
      ], { optional: true }),
    ]),
  ])
]);

