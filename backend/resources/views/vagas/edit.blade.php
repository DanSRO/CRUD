@extends('layout')

@section('content')
    <h1>Editar Vaga</h1>

    <form action="{{ route('vagas.update', $vaga) }}" method="POST">
        @csrf
        @method('PUT')
        
        <label for="titulo">Título:</label>
        <input type="text" name="titulo" value="{{ old('titulo', $vaga->titulo) }}" required>
        @error('titulo')
            <div class="alert alert-danger">{{ $message }}</div>
        @enderror

        <label for="descricao">Descrição:</label>
        <textarea name="descricao" required>{{ old('descricao', $vaga->descricao) }}</textarea>
        @error('descricao')
            <div class="alert alert-danger">{{ $message }}</div>
        @enderror

        <label for="tipo">Tipo:</label>
        <select name="tipo">
            <option value="CLT" {{ old('tipo', $vaga->tipo) === 'CLT' ? 'selected' : '' }}>CLT</option>
            <option value="Pessoa Jurídica" {{ old('tipo', $vaga->tipo) === 'Pessoa Jurídica' ? 'selected' : '' }}>Pessoa Jurídica</option>
            <option value="Freelancer" {{ old('tipo', $vaga->tipo) === 'Freelancer' ? 'selected' : '' }}>Freelancer</option>
        </select>
        @error('tipo')
            <div class="alert alert-danger">{{ $message }}</div>
        @enderror

        <label for="pausada">Pausada:</label>
        <input type="checkbox" name="pausada" {{ $vaga->pausada ? 'checked' : '' }}>
        @error('pausada')
            <div class="alert alert-danger">{{ $message }}</div>
        @enderror

        <button type="submit">Atualizar Vaga</button>
    </form>
    <a href="/"><button>Voltar para a página principal.</button></a>
@endsection