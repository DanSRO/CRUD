@extends('layout')
@section('content')
<h1>Detalhes da Vaga</h1>
<p><strong>Título: </strong>{{$vaga->titulo}}</p>
<p><strong>Descrição: </strong>{{$vaga->descricao}}</p>
<p><strong>Tipo: </strong>{{$vaga->tipo}}</p>
<p><strong>Ativa? </strong>
    @if($vaga->ativa)
        Sim
    @else
        Não
    @endif
</p>
<a href="{{route('vagas.edit', $vaga)}}"><button>Editar</button></a><br><br>
<a href="{{route('vagas.index')}}"><button>Voltar para a Lista de Vagas</button></a>

@endsection