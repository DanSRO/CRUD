@extends('layout')

@section('content')
    <h1>Criar Novo Candidato</h1>

    <form action="{{ route('candidatos.store') }}" method="POST">
        @csrf
        <label for="nome">Nome:</label>
        <input type="text" name="nome" id="nome" value="{{old('nome')}}" required>
        <label for="email">Email:</label>
        <input type="email" name="email" id="email" value="{{old('email')}}" required>
        <label for="experiencia">Experiência:</label>
        <textarea name="experiencia" id="experiencia" rows="4" required>{{old('experiencia')}}</textarea>
        <button type="submit">Salvar Candidato</button>
    </form>
    <br>
    <a href="/"><button>Voltar à Página Principal</button></a>
@endsection