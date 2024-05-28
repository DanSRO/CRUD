<?php

use App\Models\Vaga;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Database\QueryException;

class VagaTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_can_create_vaga()
    {
        $vaga = Vaga::factory()->create();

        $this->assertDatabaseHas('vagas', [
            'id' => $vaga->id,
        ]);
    }

    public function test_can_create_vaga_with_title()
    {
        $vaga = Vaga::factory()->create(['titulo' => 'Desenvolvedor PHP']);

        $this->assertDatabaseHas('vagas', [
            'id' => $vaga->id,
            'titulo' => 'Desenvolvedor PHP',
        ]);
    }

    public function test_can_create_vaga_with_description()
    {
        $vaga = Vaga::factory()->create(['descricao' => 'Descrição da vaga de desenvolvedor PHP']);

        $this->assertDatabaseHas('vagas', [
            'id' => $vaga->id,
            'descricao' => 'Descrição da vaga de desenvolvedor PHP',
        ]);
    }

    public function test_can_create_vaga_with_type()
    {
        $vaga = Vaga::factory()->create(['tipo' => 'CLT']);

        $this->assertDatabaseHas('vagas', [
            'id' => $vaga->id,
            'tipo' => 'CLT',
        ]);
    }

    // Para falhar

    public function test_cannot_create_vaga_without_title()
    {
        $this->expectException(QueryException::class);
        // $this->expectExceptionMessage('A tabela "vagas" possui uma restrição de chave estrangeira que não permite valores nulos');


        try {
            // Tenta criar uma vaga sem título
            $vaga = Vaga::factory()->create(['titulo' => null]);
        } catch (QueryException $e) {
            // Pode adicionar verificações adicionais da exceção se necessário
            throw $e;
        }
    }

    public function test_cannot_create_vaga_without_description()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);

        // Tenta criar uma vaga sem descrição
        $vaga = Vaga::factory()->create(['descricao' => null]);
    }

    public function test_cannot_create_vaga_with_invalid_type()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);

        // Tenta criar uma vaga com um tipo inválido
        $vaga = Vaga::factory()->create(['tipo' => 'Temporário']);
    }
    }