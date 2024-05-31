<?php

namespace App\Http\Controllers;

use App\Models\Candidato;
use Illuminate\Http\Client\ResponseSequence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
    
        // return view('candidatos.index', compact('candidatos'));
        return response()->json($candidatos);
    }

    public function create()
    {
        $candidatos=Candidato::all();
        // return view('candidatos.create');
        return response()->json($candidatos);
    }

    public function store(Request $request)
    {
        $validation= Validator::make($request->all(),[
            'nome' => 'required',
            'email' => 'required|email|unique:candidatos',
            'experiencia' => 'required|string',
        ]);
        
        if ($validation->fails()) {
            // return response()->json(['errors' => $validation->errors()], 422);
            return response()->json();
        }

        // Candidato::create([
        //     'nome' => $request->input('nome'),
        //     'email' => $request->input('email'),
        //     'experiencia' => $request->input('experiencia'),
        // ]);

        $candidato=new Candidato();
        $candidato->nome=$request->nome;
        $candidato->email=$request->email;
        $candidato->experiencia=$request->experiencia;

        $candidato->save();

        // return redirect()->route('candidatos.index')->with('success', 'Candidato criado com sucesso!');
        return response()->json($candidato, 201);
    }

    public function show(Candidato $candidato)
    {
        return response()->json($candidato);
        // return view('candidatos.show', compact('candidato'));
    }

    public function edit(Candidato $candidato)
    {
        // return view('candidatos.edit', compact('candidato'));
        return response()->json($candidato);
    }

    public function update(Request $request, Candidato $candidato)
    {
        $request->validate([
            'nome' => 'required',
            'email' => 'required|email|unique:candidatos,email,' . $candidato->id,
            'experiencia' => 'required',
        ]);

        $candidato->update($request->all());

        // return redirect()->route('candidatos.index')->with('success', 'Candidato atualizado com sucesso!');
        return response()->json($candidato);
    }

    public function destroy(Candidato $candidato)
    {
        $candidato->delete();

        // return redirect()->route('candidatos.index')->with('success', 'Candidato excluído com sucesso!');
        return response()->json($candidato);
    }
}
