import { trigger, transition, style, query, animate, group } from '@angular/animations';

export const fader = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        height: '100vh',
        width: '100%',
        top: 0,
        left: 0,
      })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('600ms ease', style({ opacity: 0, transform: 'translateX(-100%)' }))
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('600ms ease', style({ opacity: 1, transform: 'translateX(0)' }))
      ], { optional: true })
    ])
  ])
]);