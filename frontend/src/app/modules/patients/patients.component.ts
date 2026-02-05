import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PatientRepository } from '../../core/domain/ports/patient.repository';
import { Patient } from '../../core/domain/models/patient.model';
import { RouterModule } from '@angular/router';
import { GlassCardComponent } from '../../shared/components/ui/glass-card.component';
import { GlassButtonComponent } from '../../shared/components/ui/glass-button.component';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, GlassCardComponent, GlassButtonComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientsComponent {
  private patientRepository = inject(PatientRepository);

  patients = signal<Patient[]>([]);
  searchTerm = signal('');

  // Computed stats
  totalPatients = computed(() => this.patients().length);
  newThisMonth = signal(12); // Mock - TODO: Calculate from actual data
  activeCases = signal(45); // Mock - TODO: Calculate from actual data

  // Filtered patients based on search
  filteredPatients = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.patients();

    return this.patients().filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.cpf.includes(term) ||
        p.email?.toLowerCase().includes(term),
    );
  });

  constructor() {
    this.loadPatients();
  }

  loadPatients() {
    this.patientRepository.findAll().subscribe((data) => {
      this.patients.set(data);
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
}
