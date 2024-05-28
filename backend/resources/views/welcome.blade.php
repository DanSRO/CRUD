@extends('layout')
@section('content')
    <h1>Bem-vindo ao Sistema de Vagas e Candidatos</h1>
    <p>
        <a href="{{ route('vagas.index') }}"><button>Ir para a Lista de Vagas</button></a><br><br>
        <a href="{{ route('candidatos.index') }}"><button>Ir para a Lista de Candidatos</button></a>
    </p>
@endsection