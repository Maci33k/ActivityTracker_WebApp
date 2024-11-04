import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pop-up-training',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule,
            MatInputModule, MatSelectModule, MatButtonModule
  ],
  templateUrl: './pop-up-training.component.html',
  styleUrl: './pop-up-training.component.scss'
})
export class PopUpTrainingComponent {

  constructor(public dialogRef: MatDialogRef<PopUpTrainingComponent>,
              private fb: FormBuilder
  )
  {
    this.trainingForm = this.fb.group({
      trainingType: [''],
      duration: [''],
      heartRate: ['']
    });
  }

  trainingForm: FormGroup;

  onSubmit(): void {
    if (this.trainingForm.valid) {
      console.log(this.trainingForm.value);
      this.dialogRef.close(this.trainingForm.value);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
