import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  animateChild,
} from '@angular/animations';

export const fadeInOut = (
  duration: number,
  delay = 0,
  customName = 'fadeInOut',
  childAnimation = '*'
) =>
  trigger(customName, [
    state(
      'void',
      style({
        opacity: 0,
      })
    ),
    transition(':enter, :leave', [
      animate(`${duration}ms ${delay}ms`),
      query(childAnimation, [animateChild()]),
    ]),
  ]);
