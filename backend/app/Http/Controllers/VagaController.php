<?php

namespace App\Http\Controllers;

use App\Models\Vaga;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class VagaController extends Controller
{
    public function dashboard()
    {
        $vagas = Vaga::all();
        return view('dashboard', ['vagas' => $vagas]);
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
    
        return view('vagas.index', compact('vagas'));
    }    

    public function create()
    {
        return view('vagas.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
            'tipo' => ['required', Rule::in(['CLT', 'Pessoa Jurídica', 'Freelancer'])],
            'pausada' => 'boolean',
        ]);
    
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
        return redirect()->route('vagas.index')->with('success', 'Vaga criada com sucesso!');
    }

    public function show(Vaga $vaga){
        return view('vagas.show', compact('vaga'));
    }

    public function pausar(Vaga $vaga)
    {
        $vaga->update(['pausada' => true]);
        return redirect()->route('vagas.index')->with('success', 'Vaga pausada com sucesso!');
    }

    public function reativar(Vaga $vaga)
    {
        $vaga->update(['pausada' => false]);
        return redirect()->route('vagas.index')->with('success', 'Vaga reativada com sucesso!');
    }


    public function edit(Vaga $vaga)
    {
        return view('vagas.edit', compact('vaga'));
    }

    public function update(Request $request, Vaga $vaga)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
            'tipo' => ['required', Rule::in(['CLT', 'Pessoa Jurídica', 'Freelancer'])],
            'pausada' => 'boolean',
        ]);

        $vaga->update($request->all());
        return redirect()->route('vagas.index')->with('success', 'Vaga atualizada com sucesso!');
    }

    public function destroy(Vaga $vaga)
    {
        $vaga->delete();
        return redirect()->route('vagas.index')->with('success', 'Vaga excluída com sucesso!');
    }
}
