<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'stock' => $this->faker->numberBetween(1, 100),
            'product_image' => 'assets/media/products/' . rand(1, 30) . '.png',
            'price' => $this->faker->numberBetween(1000, 1000000),
            'description' => $this->faker->text(),
            'is_active' => $this->faker->randomElement([0, 1]),
            'created_by' => 1,
            'updated_by' => 1,
        ];
    }
}
