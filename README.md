<html>
<body>
<h1>Para rodas a aplicação deve seguir os passos logo abaixo:</h1>

<div>
<h3>Criar uma connection mysql com os seguintes valores:</h3>
<br>
<ul>
  <li>host = localhost</li>
  <li>port 3305</li>
  <li>username = root</li>
  <li>password = docker</li>
<ul>
<br>
</div>

<div>
<h3>Rodar o seguinte código para criar um database:</h3>
<br>
<ul>
  <li>CREATE DATABASE `video_store`</li>
<ul>
<br>
</div>

<div>
<h3>Rodar o seguinte código na raiz do projeto para subir o servidor:</h3>
<br>
<ul>
  <li>yarn dev:server</li>
<ul>
<br>
</div>

### Rotas da Aplicação ###

<div>
<h2>OBS: todas rotas devem conter antes seu IP, que nesse caso seria
http://localhost:3333</h2>
<table style="width:100%">
  <tr>
    <th>Rotas</th>
    <th>Tipo da Rota</th>
    <th>Parâmetros</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td>/users</td>
    <td>POST</td>
     <td>
      <h5>Enviar um corpo como JSON.</h5>
      <br>
      <p>name: O nome do usuário que será cadastrado.</p>
      <p>email: O email que será utilizado para fazer login.</p>
      <p>password: A senha que será utilizada para fazer login.</p>
     </td>
    <td>Rota utlizado para cadastrar um novo usuário.</td>
  </tr>
    <tr>
    <td>/sessions</td>
    <td>POST</td>
     <td>
      <h5>Enviar um corpo como JSON.</h5>
      <br>
      <p>email: O email do usuário que será feito o login.</p>
      <p>password: A senha do usuário para validar o login.</p>
     </td>
    <td>Rota utilizada fazer logon no sistema.</td>
  </tr>
    </tr>
    <tr>
    <td>/sessions/logout</td>
    <td>POST</td>
     <td>
      <br>
      <p>Não precisa ser enviado nenhum parametro.</p>
     </td>
    <td>Rota utilizada fazer logout no sistema.</td>
  </tr>
   <tr>
    <td>/movies</td>
    <td>POST</td>
     <td>
      <h5>Enviar um corpo como JSON.</h5>
      <br>
      <p>title: O titulo do filme para cadastro.</p>
      <p>director: O diretor do filme para cadastro.</p>
      <p>copys: A quantidade de copias que vão ser cadastradas.</p>
     </td>
    <td>
    Rota utlizada para cadastrar um Filme.
    Caso o titulo e o diretor,
    ja tenham na base de dados para o mesmo filme, será feito um update
    na quantidade de cópias.
    </td>
  </tr>
  <tr>
    <td>/movies</td>
    <td>GET</td>
     <td>
      <p>Não precisa ser enviado nenhum parametro.</p>
     </td>
    <td>
    Rota para buscar todos os filmes que tenham pelo menos um cópia no estoque.
    </td>
  </tr>
  <tr>
    <td>/movies/list-available</td>
    <td>GET</td>
     <td>
     <h5>Enviar um corpo como JSON.</h5>
      <br>
      <p>moviesAvailable: Array contendo todos os filme e quantiadades que deseja alugar.</p>
      <p>moviesAvailable.movie_id: O id do filme que deseja alugar.</p>
      <p>moviesAvailable.amount: A quantidade de cópias que deseja alugar do filme passado.</p>
     </td>
    <td>
    Rota para verificar se todos os filmes e quantidade desses filmes estão disponiveis no estoque.
    </td>
  </tr>
  <tr>
    <td>/movies/title</td>
    <td>GET</td>
     <td>
      <h5>Enviar um corpo como JSON.</h5>
      <br>
      <p>title: O titulo do filme ser feito a busca.</p>
     </td>
    <td>
    Rota para buscar todos os filmes que corresponde ao valor passado como parametro.
    </td>
  </tr>
  <tr>
    <td>/renteds</td>
    <td>POST</td>
     <td>
     <h5>Enviar um corpo como JSON.</h5>
      <br>
      <p>moviesAvailable: Array contendo todos os filme e quantiadades que deseja alugar.</p>
      <p>moviesAvailable.movie_id: O id do filme que deseja alugar.</p>
      <p>moviesAvailable.amount: A quantidade de cópias que deseja alugar do filme passado.</p>
     </td>
    <td>
    Rota para alugar todos os filmes que foram passados como parametro. Só retornará sucesso caso existem cópias o suficiente para os filmes desejados.
    </td>
  </tr>
  <tr>
    <td>/renteds/give-back</td>
    <td>POST</td>
     <td>
     <h5>Enviar um corpo como JSON.</h5>
      <br>
      <p>moviesAvailable: Array contendo todos os filme e quantiadades que deseja devolver.</p>
      <p>moviesAvailable.movie_id: O id do filme que deseja devolver.</p>
      <p>moviesAvailable.amount: A quantidade de cópias que deseja devolver do filme passado.</p>
     </td>
    <td>
    Rota para devolver todos os filmes que foram alugados. Só retornará sucesso caso existem registros de filmes alugados para aquele usuário.
    </td>
  </tr>
</table>
</div>

</body>
</html>

