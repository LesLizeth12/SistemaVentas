import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertifyService } from 'src/app/core/alertify.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private alertify: AlertifyService){}

  
  ngOnInit(): void {
    this.mostrarMensaje();
  }

  
  mostrarMensaje() {
    this.alertify.message('¡Bienvenidos a nuestro Sitio Web!');
  }

}
