import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit, OnDestroy {
  @Input('appHasRole') requiredRoles: string[] = [];
  private subscription: Subscription | undefined;
  private isViewCreated = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.currentUserRole$.subscribe(userRole => {
      // If no required roles (empty array), assume visible to all
      if (!this.requiredRoles || this.requiredRoles.length === 0) {
        this.createView();
        return;
      }

      // If user has no role, hide
      if (!userRole) {
        this.clearView();
        return;
      }

      // Check if user role is in required roles
      if (this.requiredRoles.includes(userRole)) {
        this.createView();
      } else {
        this.clearView();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private createView(): void {
    if (!this.isViewCreated) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.isViewCreated = true;
    }
  }

  private clearView(): void {
    if (this.isViewCreated) {
      this.viewContainer.clear();
      this.isViewCreated = false;
    }
  }
}
