import { Component, OnInit } from '@angular/core';
import {Equipo,Perfiles, EquipoService} from '../../SERVICES/equipo.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  ListaPerfiles: Perfiles[];

  equipo: Equipo={
    id:'',
    username:'',
    correo:'',
    telefono:'',
    seleccionado:'',
  };

  constructor(private EquipoService:EquipoService, private router:Router) { }

  ngOnInit(): void {
    this.listarPerfil();
  }
  listarPerfil()
  {
    this.EquipoService.getPerfiles().subscribe(
      res=>{
        this.ListaPerfiles=<any>res;
      },
      err => console.log(err)
    );
  }
  agregar(){
    delete this.equipo.id;
    this.EquipoService.addEquipo(this.equipo).subscribe();
    this.router.navigate(['/inicio']);
  }

}
