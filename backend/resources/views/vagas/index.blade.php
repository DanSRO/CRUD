@extends('layout')

@section('content')
    <h1>Lista de Vagas</h1>
        <form action="{{ route('vagas.index') }}" method="GET">
            <div class="form-group">
                <label for="search">Pesquisar Vagas:</label>
                <input type="text" class="form-control" id="search" name="search" placeholder="Digite o termo de pesquisa">
            </div>
            <button type="submit" class="btn btn-primary">Pesquisar</button>
            <a href="{{ route('vagas.index') }}" class="btn btn-secondary"><button>Limpar</button></a>
        </form>
    <table>
        <thead>
            <tr>
                <th>Título</th>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Ativa</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($vagas as $vaga)
                <tr>
                    <td>{{ $vaga->titulo }}</td>
                    <td>{{ $vaga->descricao }}</td>
                    <td>{{ $vaga->tipo }}</td>
                    <td>{{ $vaga->ativa ? 'Ativa' : 'Pausada' }}</td>
                    <td style="text-align: center;">
                        <a href="{{ route('vagas.show', $vaga->id) }}"><button>Detalhes</button></a>&nbsp;
                        <a href="{{ route('vagas.edit', $vaga) }}"><button>Editar</button></a>
                        <form action="{{ route('vagas.destroy', $vaga) }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <button style="background-color: red;" type="submit">Excluir</button>
                        </form>

                        @if($vaga->ativa)
                            <form action="{{ route('vagas.pausar', $vaga) }}" method="POST">
                                @csrf
                                <button type="submit">Pausar</button>
                            </form>
                        @else
                            <form action="{{ route('vagas.reativar', $vaga) }}" method="POST">
                                @csrf
                                <button type="submit">Reativar</button>
                            </form>
                        @endif
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
    
    <p>Total de Vagas: {{ $vagas->total() }}</p>
    {{ $vagas->links() }}
    <br><br>
    <a href="{{ route('vagas.create') }}"><button>Criar Nova Vaga</button></a><br><br>
    <a href="/"><button>Voltar à Página Principal</button></a>
@endsection
