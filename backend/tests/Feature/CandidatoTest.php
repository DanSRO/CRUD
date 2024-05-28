<?php

use App\Models\Candidato;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CandidatoTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_can_create_candidato()
    {
        $vaga = Candidato::factory()->create();

        $this->assertDatabaseHas('candidatos', [
            'id' => $vaga->id,
        ]);
    }
    
    public function test_cannot_create_candidato_without_name()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);

        // Tenta criar um candidato sem nome
        $candidato = Candidato::factory()->create(['nome' => null]);
    }

    public function test_cannot_create_candidato_without_email()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);

        // Tenta criar um candidato sem e-mail
        $candidato = Candidato::factory()->create(['email' => null]);
    }

    public function test_cannot_create_candidato_without_experience()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);

        // Tenta criar um candidato sem experiência
        $candidato = Candidato::factory()->create(['experiencia' => null]);
    }

}