import { Component, OnInit } from '@angular/core';
import { ShowModalService } from '../../services/show-modal.service';

@Component({
  selector: 'app-general-modal',
  standalone: false,

  templateUrl: './general-modal.component.html',
  styleUrl: './general-modal.component.scss',
})
export class GeneralModalComponent implements OnInit {
  public visible: boolean = false;
  public nome: string = '';
  constructor(private modalService: ShowModalService) {}

  ngOnInit(): void {
    this.modalService.showModalLogin.subscribe((val) => {
      this.visible = val.isVisible;
      this.nome = val.name;
    });
  }
}
