<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VagaController;
use App\Http\Controllers\CandidatoController;
use App\Http\Controllers\AuthController;


Route::get('/api', function () {
    return view('welcome');
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'user']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

// Route::middleware('guest')->get('/sanctum/csrf-cookie', function (Request $request) {
//     return response()->json(['message' => 'CSRF cookie set']);
// });

Route::get('vagas/dashboard', [VagaController::class, 'dashboard'])->name('vagas.dashboard');

Route::get('vagas', [VagaController::class, 'index'])->name('vagas.index');
Route::get('vagas/{vaga}', [VagaController::class, 'show'])->name('vagas.show');

//Route::middleware(['auth:sanctum'])->group(function () {
Route::get('vagas/create', [VagaController::class, 'create'])->name('vagas.create');//->middleware('auth');;
Route::post('vagas/store', [VagaController::class, 'store'])->name('vagas.store');
Route::get('vagas/{vaga}/edit', [VagaController::class, 'edit'])->name('vagas.edit');//->middleware('auth');;
Route::put('vagas/{vaga}', [VagaController::class, 'update'])->name('vagas.update');
Route::delete('vagas/{vaga}', [VagaController::class, 'destroy'])->name('vagas.destroy');//->middleware('auth');;
//});
Route::post('vagas/{vaga}/pausar', [VagaController::class, 'pausar'])->name('vagas.pausar');
Route::post('vagas/{vaga}/reativar', [VagaController::class, 'reativar'])->name('vagas.reativar');

Route::resource('candidatos', CandidatoController::class);
Route::get('candidatos', [CandidatoController::class, 'index'])->name('candidatos.index');
Route::get('candidatos/create', [CandidatoController::class, 'create'])->name('candidatos.create');//->middleware('auth');
Route::post('candidatos/store', [CandidatoController::class, 'store'])->name('candidatos.store');
Route::get('candidatos/{candidato}', [CandidatoController::class, 'show'])->name('candidatos.show');
Route::get('candidatos/{candidato}/edit', [CandidatoController::class, 'edit'])->name('candidatos.edit');//->middleware('auth');
Route::put('candidatos/{candidato}', [CandidatoController::class, 'update'])->name('candidatos.update');
Route::delete('candidatos/{candidato}', [CandidatoController::class, 'destroy'])->name('candidatos.destroy');//->middleware('auth');
