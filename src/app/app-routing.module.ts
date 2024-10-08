import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoComponent } from './paginas/contato/contato.component';
import { SucessoContatoComponent } from './componentes/sucesso-contato/sucesso-contato.component';
import { NaoImplementadoComponent } from './componentes/nao-implementado/nao-implementado.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { PaginaInicialComponent } from './paginas/pagina-inicial/pagina-inicial.component';
import { ErroContatoComponent } from './componentes/erro-contato/erro-contato.component';
import { ClientesComponent } from './paginas/clientes/clientes.component';
import { LoginComponent } from './paginas/pagamentos/login/login.component';
import { CadastroComponent } from './paginas/pagamentos/cadastro/cadastro.component';
import { PedidosComponent } from './paginas/pagamentos/pedidos/pedidos.component';
import { PagamentosComponent } from './paginas/pagamentos/pagamentos/pagamentos.component';
import { ConfirmarPagamentosComponent } from './paginas/pagamentos/confirmar-pagamentos/confirmar-pagamentos.component';
import { AuthGuard } from './paginas/pagamentos/core/guards/auth.guard';
import { EnderecoComponent } from './paginas/pagamentos/endereco/endereco.component';
import { PedidosLinkComponent } from './paginas/pagamentos/pedidos-link/pedidos-link.component';
import { NotificacoesComponent } from './paginas/pagamentos/notificacoes/notificacoes.component';
import { ListarProdutosComponent } from './componentes/listar-produtos/listar-produtos.component';
import { ProdutoComponent } from './paginas/produto/produto.component';
import { PaginaInicialAdmComponent } from './paginas/administrador/pagina-inicial-adm/pagina-inicial-adm.component';
import { CadastrarProdutoComponent } from './paginas/administrador/cadastrar-produto/cadastrar-produto.component';
import { CadastrarCoresProdutoComponent } from './paginas/administrador/cadastrar-cores-produto/cadastrar-cores-produto.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'paginaInicial',
    pathMatch: 'full'
  },
  {
    path: 'contato',
    component: ContatoComponent
  },
  {
    path: 'sucesso',
    component: SucessoContatoComponent
  },
  {
    path: 'naoImplementado',
    component: NaoImplementadoComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'paginaInicial',
    component: PaginaInicialComponent
  },
  {
    path: 'erro',
    component: ErroContatoComponent
  },
  {
    path: 'clientes',
    component: ClientesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'listaProdutos/:categoria',
    component: ListarProdutosComponent
  },
  {
    path: 'produto/:id',
    component: ProdutoComponent
  },
  {
    path: 'pedidos',
    component: PedidosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pedidosLink',
    component: PedidosLinkComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pagamentos',
    component: PagamentosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'confirmarPagamentos',
    component: ConfirmarPagamentosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'endereco',
    component: EnderecoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notificacoes',
    component: NotificacoesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'administrador',
    component: PaginaInicialAdmComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' } // Apenas administradores têm acesso
  },
  {
    path: 'cadastrarEditarProduto',
    component: CadastrarProdutoComponent,
    canActivate: [AuthGuard]
    // data: { expectedRole: 'admin' }
  },
  {
    path: 'cadastrarEditarProduto/:id',
    component: CadastrarProdutoComponent,
    canActivate: [AuthGuard]
    // data: { expectedRole: 'admin' }
  },
  {
    path: 'cadastrarEditarCores',
    component: CadastrarCoresProdutoComponent,
    canActivate: [AuthGuard]
    // data: { expectedRole: 'admin' }
  },
  {
    path: 'cadastrarEditarCores/:id',
    component: CadastrarCoresProdutoComponent,
    canActivate: [AuthGuard]
    // data: { expectedRole: 'admin' }
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
