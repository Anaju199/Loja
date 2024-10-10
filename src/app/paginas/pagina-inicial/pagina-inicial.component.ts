import { Component, OnInit } from '@angular/core';
import { MenuComponent } from 'src/app/componentes/menu/menu.component';
import { ProdutosService } from 'src/app/service/produtos.service';
import { Produto } from 'src/app/service/tipos';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  constructor(
    private service: ProdutosService,
  ) { }

  listaProdutos: Produto[] = []

  ngOnInit(): void {
    this.service.listar('').subscribe((listaProdutos) => {
      this.listaProdutos = listaProdutos
    })
  }


}
