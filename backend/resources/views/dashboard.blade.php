@extends('layout')

@section('content')
<div class="col-md-10 offset-md-1 dashboard-title-container">
    <h1>Minhas vagas</h1>
    @if(!empty($vagas))
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Título</th>
                <th scope="col">Descrição</th>
                <th scope="col">Tipo</th>
                <th scope="col">Ativa</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($vagas as $vaga)
            <tr>
                <td>{{ $vaga->titulo }}</td>
                <td>{{ $vaga->descricao }}</td>
                <td>{{ $vaga->tipo }}</td>
                <td>{{ $vaga->ativa ? 'Ativa' : 'Pausada' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @else
    <p>Você ainda não tem vagas cadastradas, <a href="/vagas/create">Criar Vaga</a></p>
    @endif
</div>
@endsection