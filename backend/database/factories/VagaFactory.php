<?php

namespace Database\Factories;

use App\Models\Vaga;
use Illuminate\Database\Eloquent\Factories\Factory;

class VagaFactory extends Factory
{
    protected $model = Vaga::class;

    public function definition()
    {
        return [
            'titulo' => $this->faker->sentence,
            'descricao' => $this->faker->paragraph,
            'tipo' => $this->faker->randomElement(['CLT', 'Pessoa Jurídica', 'Freelancer']),
            'ativa' => $this->faker->boolean,
        ];
    }
}
