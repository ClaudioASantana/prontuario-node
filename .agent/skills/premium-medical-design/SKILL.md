---
name: premium-medical-design
description: Premium Modern Design System for Medical Applications. Glassmorphism, mesh gradients, refined typography, and mobile-first responsive patterns.
---

# Premium Medical Design System

## Overview

This skill provides a comprehensive design system for building premium, modern medical applications with Angular. It emphasizes glassmorphism, mesh gradients, refined typography, and mobile-first responsive design.

## Core Principles

### 1. **Premium Modern Aesthetic**

- **Glassmorphism**: Translucent cards with backdrop blur
- **Mesh Gradients**: Subtle animated backgrounds
- **Refined Typography**: Clear hierarchy with modern fonts
- **Soft Shadows**: Layered depth without harshness
- **Smooth Animations**: Micro-interactions for engagement

### 2. **Medical Context**

- **Patient-Centric**: Clear, accessible information
- **Professional**: Clean, trustworthy appearance
- **Efficient**: Quick access to critical data
- **Calming**: Soft colors, reduced visual stress

### 3. **Mobile-First**

- **Responsive Breakpoints**: Mobile (768px), Tablet (1024px)
- **Touch-Friendly**: Minimum 44px touch targets
- **Drawer Pattern**: Slide-in navigation for mobile
- **Optimized Layouts**: Stack grids vertically on small screens

## Design Tokens

### Color Palette

```scss
// Primary (Blue - Trust & Medical)
$primary-50: #eff6ff;
$primary-100: #dbeafe;
$primary-200: #bfdbfe;
$primary-300: #93c5fd;
$primary-400: #60a5fa;
$primary-500: #3b82f6;
$primary-600: #2563eb;
$primary-700: #1d4ed8;
$primary-800: #1e40af;
$primary-900: #1e3a8a;

// Neutral (Slate - Professional)
$neutral-50: #f8fafc;
$neutral-100: #f1f5f9;
$neutral-200: #e2e8f0;
$neutral-300: #cbd5e1;
$neutral-400: #94a3b8;
$neutral-500: #64748b;
$neutral-600: #475569;
$neutral-700: #334155;
$neutral-800: #1e293b;
$neutral-900: #0f172a;

// Semantic Colors
$success: #10b981;
$warning: #f59e0b;
$error: #ef4444;
$info: #3b82f6;

// Text Colors
$text-main: $neutral-900;
$text-secondary: $neutral-600;
$text-tertiary: $neutral-400;
```

### Typography

```scss
// Font Family
$font-primary:
  "Inter",
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;

// Font Sizes
$text-xs: 0.75rem; // 12px
$text-sm: 0.875rem; // 14px
$text-base: 1rem; // 16px
$text-lg: 1.125rem; // 18px
$text-xl: 1.25rem; // 20px
$text-2xl: 1.5rem; // 24px
$text-3xl: 1.875rem; // 30px
$text-4xl: 2.25rem; // 36px

// Font Weights
$font-normal: 400;
$font-medium: 500;
$font-semibold: 600;
$font-bold: 700;
$font-extrabold: 800;
```

### Shadows

```scss
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
$shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### Spacing

```scss
$spacing-xs: 0.25rem; // 4px
$spacing-sm: 0.5rem; // 8px
$spacing-md: 1rem; // 16px
$spacing-lg: 1.5rem; // 24px
$spacing-xl: 2rem; // 32px
$spacing-2xl: 3rem; // 48px
```

### Border Radius

```scss
$radius-sm: 8px;
$radius-md: 12px;
$radius-lg: 16px;
$radius-xl: 20px;
$radius-2xl: 24px;
$radius-full: 9999px; // Pills
```

### Breakpoints

```scss
$mobile: 768px;
$tablet: 1024px;
$desktop: 1280px;
$wide: 1536px;
```

## Component Patterns

### 1. Glass Card

**Purpose**: Container for content with glassmorphism effect

**HTML**:

```html
<app-glass-card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</app-glass-card>
```

**Standalone Component** (`glass-card.component.ts`):

```typescript
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-glass-card",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-card">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      @import "../../../variables";

      .glass-card {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.6);
        border-radius: $radius-2xl;
        padding: 1.5rem;
        box-shadow: $shadow-md;
        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease;

        &:hover {
          transform: translateY(-4px);
          box-shadow: $shadow-xl;
          background: rgba(255, 255, 255, 0.85);
          border-color: rgba(255, 255, 255, 0.8);
        }
      }
    `,
  ],
})
export class GlassCardComponent {}
```

### 2. Glass Button

**Purpose**: Buttons with multiple variants (primary, glass, ghost)

**HTML**:

```html
<app-glass-button variant="primary" (onClick)="handleClick()">
  <i class="bi bi-plus"></i>
  New Appointment
</app-glass-button>
```

**Standalone Component** (`glass-button.component.ts`):

```typescript
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-glass-button",
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="'btn-' + variant"
      (click)="onClick.emit()"
      [disabled]="disabled"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [
    `
      @import "../../../variables";

      .btn-primary {
        background: linear-gradient(135deg, $primary-600, $primary-500);
        color: white;
        border: none;
        height: 48px;
        padding: 0 1.5rem;
        border-radius: $radius-lg;
        font-weight: $font-semibold;
        font-size: $text-base;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 6px rgba($primary-600, 0.25);

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 12px rgba($primary-600, 0.35);
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .btn-glass {
        width: 48px;
        height: 48px;
        border-radius: $radius-lg;
        background: rgba(255, 255, 255, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        color: $primary-700;
        cursor: pointer;
        transition: all 0.2s;

        &:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
          color: $primary-600;
        }
      }

      .btn-ghost {
        background: transparent;
        border: 1px solid $neutral-300;
        color: $text-main;
        height: 48px;
        padding: 0 1.5rem;
        border-radius: $radius-lg;
        font-weight: $font-medium;
        cursor: pointer;
        transition: all 0.2s;

        &:hover:not(:disabled) {
          background: $neutral-50;
          border-color: $neutral-400;
        }
      }
    `,
  ],
})
export class GlassButtonComponent {
  @Input() variant: "primary" | "glass" | "ghost" = "primary";
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<void>();
}
```

### 3. Mesh Gradient Background

**Purpose**: Animated gradient background for pages

**SCSS**:

```scss
.mesh-gradient-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0.05;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(
        circle at 20% 50%,
        rgba(102, 126, 234, 0.3) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 80%,
        rgba(118, 75, 162, 0.3) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 20%,
        rgba(59, 130, 246, 0.3) 0%,
        transparent 50%
      );
    animation: meshMove 20s ease-in-out infinite;
  }
}

@keyframes meshMove {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, 20px);
  }
}
```

### 4. Stat Card

**Purpose**: Display KPI metrics with icon and trend

**HTML**:

```html
<div class="stat-card">
  <div class="stat-icon-wrapper gradient-blue">
    <i class="bi bi-people-fill"></i>
  </div>
  <div class="stat-details">
    <div class="stat-value">247</div>
    <div class="stat-label">Total Patients</div>
  </div>
  <div class="stat-trend positive"><i class="bi bi-arrow-up"></i> +12%</div>
</div>
```

**SCSS**:

```scss
.stat-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.75rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: $radius-2xl;
  box-shadow: $shadow-md;
  transition: all 0.3s ease;

  @media (max-width: $mobile) {
    padding: 1.25rem;
    gap: 1rem;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-xl;
  }

  .stat-icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: $radius-lg;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    color: white;

    &.gradient-blue {
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }
    &.gradient-teal {
      background: linear-gradient(135deg, #10b981, #059669);
      box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
    }
    &.gradient-rose {
      background: linear-gradient(135deg, #f43f5e, #e11d48);
      box-shadow: 0 4px 12px rgba(225, 29, 72, 0.3);
    }
  }

  .stat-details {
    flex: 1;

    .stat-value {
      font-size: 2rem;
      font-weight: $font-extrabold;
      color: $text-main;
      line-height: 1.1;
    }

    .stat-label {
      font-size: 0.9rem;
      color: $text-secondary;
      font-weight: $font-medium;
    }
  }

  .stat-trend {
    font-size: 0.85rem;
    font-weight: $font-bold;

    &.positive {
      color: $success;
    }
    &.negative {
      color: $error;
    }
    &.neutral {
      color: $text-secondary;
    }
  }
}
```

## Mobile Responsiveness

### Drawer Pattern (Sidebar)

**MainLayout State Management**:

```typescript
export class MainLayoutComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
```

**Template**:

```html
<!-- Backdrop -->
<div
  class="sidebar-backdrop"
  *ngIf="isMobileMenuOpen"
  (click)="toggleMobileMenu()"
></div>

<!-- Sidebar -->
<aside class="sidebar-wrapper">
  <app-sidebar [isOpen]="isMobileMenuOpen" (closeMenu)="toggleMobileMenu()">
  </app-sidebar>
</aside>

<!-- Header -->
<app-header (toggleMenu)="toggleMobileMenu()"></app-header>
```

**Sidebar Component**:

```typescript
@Component({
  selector: "app-sidebar",
  host: { "[class.open]": "isOpen" },
  // ...
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();
}
```

**Sidebar SCSS**:

```scss
:host {
  display: block;
  height: 100%;

  @media (max-width: $tablet) {
    position: fixed;
    top: 0;
    left: 0;
    width: 80%;
    max-width: 300px;
    height: 100%;
    z-index: 50;
    transform: translateX(-110%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &.open {
      transform: translateX(0);
    }
  }
}
```

**Backdrop SCSS**:

```scss
.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 40;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

### Responsive Grids

```scss
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: $tablet) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: $mobile) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}

.main-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: $tablet) {
    grid-template-columns: 1fr;
  }
}
```

## Animation Patterns

### Fade In

```scss
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}
```

### Float

```scss
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.float {
  animation: float 3s ease-in-out infinite;
}
```

### Wave (Emoji)

```scss
@keyframes wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  10%,
  30% {
    transform: rotate(14deg);
  }
  20%,
  40% {
    transform: rotate(-8deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(0deg);
  }
}

.wave {
  display: inline-block;
  animation: wave 2s ease-in-out infinite;
}
```

## Usage Guidelines

### When to Use This Skill

1. **New Medical Application Pages**: Dashboard, Patient Lists, Appointments
2. **Modernizing Existing UI**: Replacing legacy designs
3. **Mobile-First Development**: Building responsive layouts
4. **Component Library**: Creating reusable UI components

### Implementation Checklist

- [ ] Import `variables.scss` in component styles
- [ ] Use `GlassCardComponent` for content containers
- [ ] Use `GlassButtonComponent` for actions
- [ ] Add mesh gradient background to pages
- [ ] Implement responsive breakpoints
- [ ] Add mobile drawer pattern for navigation
- [ ] Use stat cards for KPIs
- [ ] Apply animations for micro-interactions
- [ ] Test on mobile devices (min 44px touch targets)

### Best Practices

1. **Consistency**: Always use design tokens from `variables.scss`
2. **Accessibility**: Maintain color contrast ratios (WCAG AA)
3. **Performance**: Use `backdrop-filter` sparingly (GPU intensive)
4. **Mobile-First**: Design for mobile, enhance for desktop
5. **Touch Targets**: Minimum 44x44px for interactive elements
6. **Loading States**: Add skeleton screens for async content
7. **Error States**: Use semantic colors ($error, $warning)

## Examples

See the following components for reference implementations:

- [`dashboard.component.ts`](file:///d:/repos/prontuario-node/frontend/src/app/modules/dashboard/dashboard.component.ts)
- [`sidebar.component.ts`](file:///d:/repos/prontuario-node/frontend/src/app/layout/components/sidebar/sidebar.component.ts)
- [`header.component.ts`](file:///d:/repos/prontuario-node/frontend/src/app/layout/components/header/header.component.ts)
- [`glass-card.component.ts`](file:///d:/repos/prontuario-node/frontend/src/app/shared/components/ui/glass-card/glass-card.component.ts)
- [`glass-button.component.ts`](file:///d:/repos/prontuario-node/frontend/src/app/shared/components/ui/glass-button/glass-button.component.ts)

## Quick Start

1. **Import Variables**:

```scss
@import "../../../../variables";
```

2. **Use Glass Card**:

```html
<app-glass-card>
  <h2>Patient Information</h2>
  <p>Details here...</p>
</app-glass-card>
```

3. **Add Responsive Grid**:

```scss
.patient-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: $mobile) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}
```

4. **Implement Mobile Drawer**:

- Follow the "Drawer Pattern" section above
- Add hamburger button to header
- Connect state management in MainLayout

---

**Last Updated**: 2026-02-04  
**Version**: 1.0.0  
**Maintainer**: Antigravity AI
