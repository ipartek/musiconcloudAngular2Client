import { Component, OnInit } from '@angular/core';

import { CancionesService } from '../providers/canciones.service';
import { Cancion } from '../model/cancion';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.scss']
})
export class CancionesComponent implements OnInit {

  //canciones
  canciones : Cancion[]; 
  cancionSeleccionada : Cancion;
  nombreCancion: String;
  isValid: boolean;

  constructor( private cancionesService: CancionesService) { 
    console.log('CancionesComponent constructor');
    //inicializar atributos
    this.isValid= false;
    this.nombreCancion = '';
    this.canciones = [];
    this.cancionSeleccionada = new Cancion(-1,"");   
    //this.mockData();
  }

  ngOnInit() {
    console.log('CancionesComponent ngOnInit');
    //llamadas a los servicios
    this.recargar();

  }//ngOnInit

  /**
   * Recarga las canciones mediante GET
   */
  recargar(){
    console.log('CancionesComponent recargar');
    this.canciones = [];
    this.cancionesService.getAll().subscribe(
      result=>{
        console.log('    response correcto %o', result);   
        if ( result != null ){     
          result.forEach( element => {
              this.canciones.push( element );
          });    
        }      
      },
      error=>{
        console.warn(error);
      }
    );
  }


  eliminar( id: number ){
    console.log(`CancionesComponent eliminar ${id}`);
    if ( confirm("¿ Quieres eliminar la canción ?") ){
      
      this.cancionesService.delete(id).subscribe(
        result=>{
            this.recargar();
            console.log(`Cancion Eliminada!!!`);
        },error=>{
          console.warn('Error al crear %o', error );
        }
      );
    }
  }

  crearCancion(){
    console.log(`CancionesComponent crearCancion ${this.nombreCancion}`);
    this.nombreCancion = this.nombreCancion.trim();

    if ( this.nombreCancion.length > 0 ){
      this.isValid = false;      
      console.debug(`crear cancion ${this.nombreCancion}`);
      this.cancionesService.crear( this.nombreCancion ).subscribe(
        result=>{
          this.nombreCancion = '';
          this.recargar();
        },error=>{
          console.warn('Error al crear %o', error );
        }
      );

    }else{
      this.isValid = true;
      console.warn(`nombre cancion vacio o no correcta`);
    }
  }//crearCancion


  modificar(index: number){
    let cancion = this.canciones[index];
    console.log(`CancionesComponent modificar onfousout cancion: %o`, cancion);
    if ( cancion.nombre.trim().length > 0 ){
      this.cancionesService.modificar(cancion).subscribe(
        result=>{        
          this.recargar();
        },error=>{
          console.warn('Error al modificar %o', error );
        }
      );
    }else{
      console.warn('Nombre cancion NO valido');
    }
  }//modificar


  mockData(){
    this.canciones.push( new Cancion(1,"Macarena"));
    this.canciones.push( new Cancion(13,"Betoben"));
    this.canciones.push( new Cancion(14,"Baszilara sobre tu tumbar"));
    this.canciones.push( new Cancion(31,"La lloreona"));
    this.canciones.push( new Cancion(31,"Need a coffe"));
    this.canciones.push( new Cancion(16,"Descanso please"));
    this.canciones.push( new Cancion(1756,"Angular again o no"));
  }

}
