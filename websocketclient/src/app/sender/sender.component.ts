import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { fromEventPattern } from 'rxjs';
import { WsService } from '../ws.service';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {
  senderForm: FormGroup
  constructor(private wsService:WsService) { }

  ngOnInit(): void {
    this.senderForm = new FormGroup({
      ID:new FormControl(),
      Message:new FormControl()
    })
    this.wsService.connect("1")
  }
  sendMessage(){

  }


}
