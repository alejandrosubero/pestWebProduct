import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetRef, MatBottomSheetModule } from '@angular/material/bottom-sheet';



@Component({
  selector: 'app-search-info-sheet',
  standalone: true,
  imports: [CommonModule, MatBottomSheetModule,],
  templateUrl: './search-info-sheet.component.html',
  styleUrl: './search-info-sheet.component.scss'
})
export class SearchInfoSheetComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<SearchInfoSheetComponent>) { }

  close(): void {
    this.bottomSheetRef.dismiss();
  }
}
