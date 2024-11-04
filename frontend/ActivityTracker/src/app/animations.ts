import { trigger, transition, style, animate, state } from '@angular/animations';

export const slideInAnimation = trigger('slideIn', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)', opacity: 0 }),
    animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
  ])
]);

export const expandAnimation = trigger('expand', [
  state('collapsed', style({ height: '20%', opacity: 1 })),
  state('expanded', style({ height: '100vh', opacity: 1 })),
  transition('collapsed => expanded', [
    animate('300ms ease-out')
  ]),
  transition('expanded => collapsed', [
    animate('300ms ease-in')
  ])
]);

export const fadeSlideAnimation = trigger('fadeSlide', [
  state('active', style({
    opacity: 1,
    transform: 'translateY(0)'
  })),
  state('inactive', style({
    opacity: 0,
    transform: 'translateY(-100%)'
  })),
  transition('active => inactive', [
    animate('0.5s')
  ]),
  transition('inactive => active', [
    animate('0.5s')
  ])
]);

export const slideInFromLeftAnimation = trigger('slideInFromLeft', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
  ])
]);

export const slideAnimation = trigger('slideAnimation', [
  transition('false => true', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
  ]),
  transition('true => false', [
    style({ transform: 'translateX(0)', opacity: 1 }),
    animate('500ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
  ])
]);

export const expandFromClickAnimation = trigger('expandFromClick', [
  transition(':enter', [
    style({
      width: '0px',
      height: '0px',
      top: '{{startY}}px',
      left: '{{startX}}px'
    }),
    animate('0.5s ease-in-out', style({
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px'
    }))
  ], { params: { startX: window.innerWidth/2, startY: window.innerHeight/2 } }),

  transition(':leave', [
    animate('0.5s ease-in-out', style({
      width: '0px',
      height: '0px',
      top: window.innerWidth/2,
      left: window.innerHeight/2
    }))
  ])
]);

export const textAnimation = trigger('textAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.5s ease-in', style({ opacity: 1 }))
  ]),
]);
