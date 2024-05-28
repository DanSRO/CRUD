<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vagas</title>
    <!-- estilos CSS aqui -->
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    <link href="https://fonts.googleapis.com/css2?family=Roboto" rel="stylesheet">
    <!--js da app-->
    <script src="/js/scripts.js"></script>
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="collapse navbar-collapse" id="navbar">                
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a href="/" class="nav-link">Página Principal</a>
                    </li>
                    <li class="nav-item">
                        <a href="/vagas/create" class="nav-link">Criar Vagas</a>
                    </li>
                    @auth
                    <li class="nav-item">
                        <a href="/vagas/dashboard" class="nav-link">Minhas vagas</a>
                    </li>
                    <li class="nav-item">
                        <form action="/logout" method="post">
                            @csrf
                            <a href="/logout" class="nav-link" 
                                onclick="event.preventDefault(); 
                                this.closest('form').submit();">
                                Sair
                            </a>
                        </form>
                    </li>
                    @endauth
                    @guest
                    <li class="nav-item">
                        <a href="/login" class="nav-link">Entrar</a>
                    </li>
                    <li class="nav-item">
                        <a href="/register" class="nav-link">Cadastrar Usuário</a>
                    </li>
                    @endguest
                </ul>
            </div>
        </nav>
    </header>
    <main>
        <div class="container-fluid">
            <div class="row">
                @if(session('msg'))
                <p class="msg">{{session('msg')}}</p>
                @endif
                @yield('content')
            </div>
        </div>
    </main>

    <footer>
        <!-- Rodapé -->
    </footer>

    <!-- JavaScript  -->
</body>
</html>