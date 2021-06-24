import { Injectable } from '@angular/core';
import {webSocket} from 'rxjs/webSocket'

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor() { }
  connect(id:string){
    var url = "wss://localhost:44327/ws?id="+id
    var obs$ = webSocket({url:url,deserializer:msg=>msg})
    obs$.subscribe(msg=>console.log(msg))

  }

}
