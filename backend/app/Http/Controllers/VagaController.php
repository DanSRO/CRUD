<?php

namespace App\Http\Controllers;

use App\Models\Vaga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class VagaController extends Controller
{
    public function dashboard()
    {
        $vagas = Vaga::all();
        // return view('dashboard', ['vagas' => $vagas]);
        return response()->json($vagas);
        // $user = auth()->user();
        // $vagas = $user->vagas;        
        // return view('vagas.dashboard', ['vagas' => $vagas]);
    }

    public function index(Request $request)
    {
        if ($request->has('limpar')) {
            return redirect()->route('vagas.index');
        }
        
        $termoPesquisa = $request->input('search');
    
        // Se houver um termo de pesquisa, realiza a busca
        if ($termoPesquisa) {
            $vagas = Vaga::where('titulo', 'like', "%$termoPesquisa%")
                ->orWhere('descricao', 'like', "%$termoPesquisa%")
                ->paginate(20);
        } else {
            // Se não houver termo de pesquisa, obtém todas as vagas paginadas
            $vagas = Vaga::paginate(20);
        }    
        // return view('vagas.index', compact('vagas'));
        return response()->json($vagas);
    }    

    public function create()
    {
        $vagas=Vaga::all();
        // return view('vagas.create');
        return response()->json($vagas);
    }

    public function store(Request $request)
    {
        $validation=Validator::make($request->all(),[
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
            'tipo' => ['required', Rule::in(['CLT', 'Pessoa Jurídica', 'Freelancer'])],
            'pausada' => 'boolean',
        ]);

        if ($validation->fails()) {
            return response()->json(['errors' => $validation->errors()], 422);
        }
    
        // Instância de Vaga com base nos dados do formulário
        $novaVaga = new Vaga();
        $novaVaga->titulo = $request->titulo;
        $novaVaga->descricao = $request->descricao;
        $novaVaga->tipo = $request->tipo;
        $novaVaga->pausada = $request->has('pausada'); // Checkbox pausada está marcado
    
        // Salva nova vaga no banco de dados
        // $user = auth()->user();
        // $novaVaga = $user->vagas; 
        $novaVaga->save();
    
        // Redireciona para a página de listagem após a criação
        // return redirect()->route('vagas.index')->with('success', 'Vaga criada com sucesso!');
        //retorna o json para o react
        return response()->json($novaVaga, 201);
    }

    public function show(Vaga $vaga){
        // return view('vagas.show', compact('vaga'));
        return response()->json($vaga);
    }

    public function pausar(Vaga $vaga)
    {
        $vaga->update(['pausada' => true]);
        // return redirect()->route('vagas.index')->with('success', 'Vaga pausada com sucesso!');
        return response()->json(['message' => 'Vaga pausada com sucesso!', 'vaga' => $vaga], 200);
    }

    public function reativar(Vaga $vaga)
    {
        $vaga->update(['pausada' => false]);
        //return redirect()->route('vagas.index')->with('success', 'Vaga reativada com sucesso!');
        return response()->json(['message' => 'Vaga reativada com sucesso!', 'vaga' => $vaga], 200);
    }


    public function edit(Vaga $vaga)
    {
        // return view('vagas.edit', compact('vaga'));
        return response()->json($vaga, 200);
    }

    public function update(Request $request, Vaga $vaga)
    {
        $validatedData = $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
            'tipo' => ['required', Rule::in(['CLT', 'Pessoa Jurídica', 'Freelancer'])],
            'pausada' => 'boolean',
        ]);

        // $vaga->update($request->all());
        $vaga->update($validatedData);
        // return redirect()->route('vagas.index')->with('success', 'Vaga atualizada com sucesso!');
        return response()->json(['message'=>'Vaga atualizada com sucesso', 'vaga'=>$vaga],200);
    }

    public function destroy(Vaga $vaga)
    {
        $vaga->delete();
        // return redirect()->route('vagas.index')->with('success', 'Vaga excluída com sucesso!');
        return response()->json($vaga, 200);
    }
}
