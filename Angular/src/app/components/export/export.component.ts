import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  msgs: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }
  show() {
    this.messageService.add({severity:'success', summary:'Info Message', detail:'PrimeNG rocks'});
}
}
