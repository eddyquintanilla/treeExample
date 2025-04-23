import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Output, EventEmitter } from '@angular/core';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

interface TreeNode {
  id: number;
  name: string;
  children?: TreeNode[];
  level?: number; // ← Nuevo
}

@Component({
  selector: 'app-tree-select',
  standalone: true, // ← Componente standalone
  imports: [
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.css'],
})
export class TreeSelectComponent {
  treeControl = new NestedTreeControl<TreeNode>((node) => node.children ?? []);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  selectedNode: TreeNode | null = null;
  isDropdownOpen = false;
  @Output() itemSelected = new EventEmitter<number>();

  constructor() {
    const rawData: TreeNode[] = [
      {
        id: 1,
        name: 'Frutas',
        children: [
          { id: 2, name: 'Manzana' },
          { id: 3, name: 'Banana' },
          {
            id: 4,
            name: 'Cítricos',
            children: [
              { id: 5, name: 'Naranja' },
              { id: 6, name: 'Limón' },
            ],
          },
        ],
      },
      {
        id: 7,
        name: 'Verduras',
        children: [
          { id: 8, name: 'Zanahoria' },
          { id: 9, name: 'Espinaca' },
        ],
      },
    ];


    this.dataSource.data = this.assignLevels(rawData);
  }

  assignLevels(data: TreeNode[], level: number = 0): TreeNode[] {
    return data.map(node => ({
      ...node,
      level,
      children: node.children ? this.assignLevels(node.children, level + 1) : undefined,
    }));
  }

  hasChild = (_: number, node: TreeNode) =>
    !!node.children && node.children.length > 0;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectNode(node: TreeNode): void {
    this.selectedNode = node;
    console.log('ID seleccionado en el componente:', node.id);
    this.itemSelected.emit(node.id); // ← aquí emites el ID
    this.isDropdownOpen = false;
  }

}
