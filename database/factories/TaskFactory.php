<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(),
            'description' => $this->faker->realText(),
            'status' => $this->faker->randomElement(['in_progress', 'pending', 'completed']),
            'image_path' => $this->faker->imageUrl(),
            'priority' => $this->faker->randomElement(['Low', 'Medium', 'High']),
            'due_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'assigned_user_id' => $this->faker->numberBetween(1, 2),
            'created_by' => $this->faker->numberBetween(1, 2),
            'updated_by' => $this->faker->numberBetween(1, 2),
            'project_id' => $this->faker->numberBetween(1, 2),
        ];
    }
}
