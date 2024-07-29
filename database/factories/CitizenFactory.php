<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Citizen>
 */
class CitizenFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nik' => $this->faker->unique()->numerify('###############'),
            'nama' => $this->faker->name,
            'alamat' => $this->faker->address,
            'kelurahan' => $this->faker->city,
            'opr' => $this->faker->randomElement(['Operator 1', 'Operator 2', 'Operator 3']),
            'waktu_cetak' => $this->faker->dateTimeThisYear,
            'keterangan' => $this->faker->sentence,
            'catatan' => $this->faker->sentence,
        ];
    }
}
