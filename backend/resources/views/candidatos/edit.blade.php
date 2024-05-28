@extends('layout')

@section('content')
    <h1>Editar Candidato</h1>
    <form action="{{ route('candidatos.update', $candidato) }}" method="POST">
        @csrf
        @method('PUT')
        <label for="nome">Nome:</label>
        <input type="text" name="nome" value="{{ $candidato->nome }}" required>
        <label for="email">Email:</label>
        <input type="email" name="email" value="{{ $candidato->email }}" required>
        <label for="experiencia">Experiência:</label>
        <textarea name="experiencia" required>{{ $candidato->experiencia }}</textarea>
        <button type="submit">Atualizar Candidato</button>
    </form>
    <br>
    <a href="{{ route('candidatos.index') }}"><button>Voltar à Lista de Candidatos</button></a>

@endsection