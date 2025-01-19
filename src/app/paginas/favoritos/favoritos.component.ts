import { Component, OnInit } from '@angular/core';
import { ProdutosFavoritosService } from 'src/app/service/produtos-favoritos.service';
import { Produto } from 'src/app/service/tipos';
import { UserService } from '../pagamentos/services/user.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  constructor(
    private service: ProdutosFavoritosService,
    private userService: UserService
  ) { }

  listaProdutosFavoritos: Produto[] = []
  userId = this.userService.retornarId();
  
  ngOnInit(): void {
    this.service.listar(this.userId).subscribe((listaProdutosFavoritos) => {
      this.listaProdutosFavoritos = listaProdutosFavoritos
    })
  }

}
