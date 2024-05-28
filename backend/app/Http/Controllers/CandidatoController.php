<?php

namespace App\Http\Controllers;

use App\Models\Candidato;
use Illuminate\Http\Request;

class CandidatoController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('limpar')) {
            return redirect()->route('candidatos.index');
        }
        
        $termoPesquisa = $request->input('search');
    
        // Se houver um termo de pesquisa, realiza a busca
        if ($termoPesquisa) {
            $candidatos = Candidato::where('nome', 'like', "%$termoPesquisa%")
                ->orWhere('email', 'like', "%$termoPesquisa%")
                ->paginate(20);
        } else {
            // Se não houver termo de pesquisa, obtém todas os candidatos paginados
            $candidatos = Candidato::paginate(20);
        }
    
        return view('candidatos.index', compact('candidatos'));
    }

    public function create()
    {
        return view('candidatos.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required',
            'email' => 'required|email|unique:candidatos',
            'experiencia' => 'required|string',
        ]);

        Candidato::create([
            'nome' => $request->input('nome'),
            'email' => $request->input('email'),
            'experiencia' => $request->input('experiencia'),
        ]);

        return redirect()->route('candidatos.index')->with('success', 'Candidato criado com sucesso!');
    }

    public function show(Candidato $candidato)
    {
        return view('candidatos.show', compact('candidato'));
    }

    public function edit(Candidato $candidato)
    {
        return view('candidatos.edit', compact('candidato'));
    }

    public function update(Request $request, Candidato $candidato)
    {
        $request->validate([
            'nome' => 'required',
            'email' => 'required|email|unique:candidatos,email,' . $candidato->id,
            'experiencia' => 'required',
        ]);

        $candidato->update($request->all());

        return redirect()->route('candidatos.index')->with('success', 'Candidato atualizado com sucesso!');
    }

    public function destroy(Candidato $candidato)
    {
        $candidato->delete();

        return redirect()->route('candidatos.index')->with('success', 'Candidato excluído com sucesso!');
    }
}
