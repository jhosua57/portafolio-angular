import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/prod-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
    
  producto: ProductoDescripcion;
  idProducto: string;

  constructor( private route: ActivatedRoute,
               public productoService: ProductosService ) { }

  ngOnInit() {

    this.route.params.subscribe( parametros => {
      // console.log(parametros);

    this.productoService.getProducto(parametros['idProducto'])
        .subscribe( (producto: ProductoDescripcion) => {
          this.idProducto = parametros['idProducto'];
          this.producto = producto;
          // console.log(producto);
          });
    });
  }

}
