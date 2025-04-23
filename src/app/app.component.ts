import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TreeSelectComponent } from './tree-select/tree-select.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TreeSelectComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pangular18';

  onItemSelected(id: number) {
    console.log('Recibido del componente hijo:', id);
  }
}
