import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { promise } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  filtroProducto: Producto[] = [];

  constructor( public http:HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise( ( resolv, reject ) => {
    
      this.http.get('https://angular-html-2ba25.firebaseio.com/productos_idx.json')
          .subscribe( (resp: Producto[]) => {
          // console.log(resp);
          this.productos = resp;
          this.cargando = false;
          resolv();
      });
    });
  }

  getProducto(idProducto: string) {
    return this.http.get(`https://angular-html-2ba25.firebaseio.com/productos/${ idProducto }.json`);
  }

  buscarProducto( termino: string ) {

    if ( this.productos.length === 0 ) {
      // cargar productos
      this.cargarProductos().then( () => {
        // ejecutar despues de tener los productos
        // aplicar el filtro
        this.filtrarProductos( termino );
      });
    } else {
      // filtro de productos
      this.filtrarProductos( termino );
    }
  }

  private filtrarProductos( termino: string ) {
    // console.log(this.productos);
    this.filtroProducto = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.filtroProducto.push(prod);
      }
    });
  }

}
