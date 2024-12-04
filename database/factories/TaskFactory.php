<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use App\Enums\TaskStatus;
use App\Enums\TaskPriority;
use App\Enums\TaskTag;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition()
    {
        return [
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,
            'user_id' => User::factory(),
            'status' => $this->faker->randomElement(TaskStatus::cases())->value,
            'priority' => $this->faker->randomElement(TaskPriority::cases())->value,
            'tags' => json_encode($this->faker->randomElements(
                array_map(fn($tag) => $tag->value, TaskTag::cases()), 
                $this->faker->numberBetween(1, 3)) 
            ),
            'due_date' => $this->faker->optional()->dateTimeBetween('now', '+1 year'),
            'estimated_hours' => $this->faker->optional()->randomFloat(2, 1, 100), // Between 1 and 100 hours
            'actual_hours' => $this->faker->optional()->randomFloat(2, 1, 100),
            'progress' => $this->faker->numberBetween(0, 100), // Random progress percentage
            'effort_score' => $this->faker->optional()->numberBetween(1, 10), // Effort scale of 1-10
            'urgency_score' => $this->faker->optional()->numberBetween(1, 10), // Urgency scale of 1-10
        ];
    }
}


