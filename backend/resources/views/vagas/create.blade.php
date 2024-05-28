@extends('layout')

@section('content')
    <h1>Criar Nova Vaga</h1>

    <form action="{{ route('vagas.store') }}" method="POST">
        @csrf
        <label for="titulo">Título:</label>
        <input type="text" name="titulo" required>
        <label for="descricao">Descrição:</label>
        <textarea name="descricao" required></textarea>
        <label for="tipo">Tipo:</label>
        <select name="tipo">
            <option value="CLT">CLT</option>
            <option value="Pessoa Jurídica">Pessoa Jurídica</option>
            <option value="Freelancer">Freelancer</option>
        </select>
        <label for="ativa">Ativa:</label>
        <input type="checkbox" name="ativa" checked>
        <button type="submit">Salvar Vaga</button>
    </form>
    <br>
    <a href="/"><button>Voltar à Página Principal</button></a>
@endsection