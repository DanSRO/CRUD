@extends('layout')

@section('content')
    <h1>Lista de Candidatos</h1>
        <form action="{{ route('candidatos.index') }}" method="GET">
            <div class="form-group">
                <label for="search">Pesquisar Candidatos:</label>
                <input type="text" class="form-control" id="search" name="search" placeholder="Digite o termo de pesquisa">
            </div>
            <button type="submit" class="btn btn-primary">Pesquisar</button>
            <a href="{{ route('candidatos.index') }}" class="btn btn-secondary"><button>Limpar</button></a>
        </form>
    <table>
        <thead>
            <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Experiência</th>                
                <th>Ações</th>
            </tr>
        </thead>        
        <tbody>
            @if(count($candidatos) > 0)                
                @foreach($candidatos as $candidato)
                    <tr>
                        <td>{{ $candidato->nome }}</td>
                        <td>{{ $candidato->email }}</td>
                        <td>{{ $candidato->experiencia}}</td>
                        <td>
                            <a href="{{ route('candidatos.show', $candidato->id) }}"><button>Detalhes</button></a>&nbsp;                        
                            <a href="{{ route('candidatos.edit', $candidato->id) }}"><button>Editar</button></a>
                            <form action="{{ route('candidatos.destroy', $candidato->id) }}" method="post">
                                @csrf
                                @method('delete')
                                <button style="background-color: red;" type="submit">Excluir</button>
                            </form>
                        </td>                        
                    </tr>
                @endforeach                
            @else
                <p>Nenhum candidato encontrado.</p>
            @endif
        </tbody>
    </table>
    <a href="{{ route('candidatos.create') }}"><button>Criar Novo Candidato</button></a><br><br>
    <a href="/"><button>Voltar à Página Principal</button></a>

@endsection