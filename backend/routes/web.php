<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VagaController;
use App\Http\Controllers\CandidatoController;

/*
Route::get('/', function () {
    return view('welcome');
});

Route::get('vagas/dashboard', [VagaController::class, 'dashboard'])->name('vagas.dashboard')->middleware('auth');;

// Route::get('vagas', [VagaController::class, 'index'])->name('vagas.index');
Route::get('vagas/create', [VagaController::class, 'create'])->name('vagas.create')->middleware('auth');;
Route::post('vagas/store', [VagaController::class, 'store'])->name('vagas.store');
Route::get('vagas/{vaga}', [VagaController::class, 'show'])->name('vagas.show');
Route::get('vagas/{vaga}/edit', [VagaController::class, 'edit'])->name('vagas.edit')->middleware('auth');;
Route::put('vagas/{vaga}', [VagaController::class, 'update'])->name('vagas.update');
Route::delete('vagas/{vaga}', [VagaController::class, 'destroy'])->name('vagas.destroy')->middleware('auth');;

Route::post('vagas/{vaga}/pausar', [VagaController::class, 'pausar'])->name('vagas.pausar');
Route::post('vagas/{vaga}/reativar', [VagaController::class, 'reativar'])->name('vagas.reativar');

Route::resource('candidatos', CandidatoController::class);
Route::get('candidatos', [CandidatoController::class, 'index'])->name('candidatos.index');
Route::get('candidatos/create', [CandidatoController::class, 'create'])->name('candidatos.create')->middleware('auth');;
Route::post('candidatos/store', [CandidatoController::class, 'store'])->name('candidatos.store');
Route::get('candidatos/{candidato}', [CandidatoController::class, 'show'])->name('candidatos.show');
Route::get('candidatos/{candidato}/edit', [CandidatoController::class, 'edit'])->name('candidatos.edit')->middleware('auth');;
Route::put('candidatos/{candidato}', [CandidatoController::class, 'update'])->name('candidatos.update');
Route::delete('candidatos/{candidato}', [CandidatoController::class, 'destroy'])->name('candidatos.destroy')->middleware('auth');;
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified'
])->group(function () {
    Route::get('vagas/dashboard', [VagaController::class, 'dashboard'])->name('vagas.dashboard')->middleware('auth');
});
*/