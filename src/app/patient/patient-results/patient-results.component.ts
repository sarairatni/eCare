import { NgFor, NgIf } from '@angular/common';
import { Component, input, inject, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { PatientService } from '../../services/patient.service';

Chart.register(...registerables);
@Component({
  selector: 'app-patient-results',
  imports: [NgFor, NgIf,RouterModule],
  templateUrl: './patient-results.component.html',
  styleUrl: './patient-results.component.css'
})
export class PatientResultsComponent implements OnInit {
  analyses:any;
  imageries:any;
  ngOnInit(): void {
    this.analyses = this.patientService.getBiologique();
    this.imageries = this.patientService.getRadiologique();
    console.log('asdwd', this.analyses);
  }
  isPopupVisible = false;
  chart: Chart | null = null;
  openPopup() {
    this.isPopupVisible = true;
  }
  patientService=inject(PatientService);
  closePopup() {
    this.isPopupVisible = false;
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
  onParameterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedParameter = target.value;
    this.updateGraph();
  }

  updateGraph() {
    const chartContainer = document.getElementById('chart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(chartContainer, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: `Évolution de ${this.selectedParameter}`,
            data: [10, 20, 15, 30, 25],
            borderColor: '#643869',
            borderWidth: 2,
            fill: false,
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }
  parameters = ['Paramètre 1', 'Paramètre 2', 'Paramètre 3'];
  selectedParameter: string | null = null;
 
}
