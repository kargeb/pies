import { CanDeactivateFn } from '@angular/router';

export interface CanDeactivateComponent {
  canDeactivate: () => boolean;
}

export const deactivateGuard: CanDeactivateFn<CanDeactivateComponent> = (
  component,
) => {
  if (component.canDeactivate) {
    return component.canDeactivate();
  }

  return true;
};
