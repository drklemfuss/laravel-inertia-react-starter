<?php

// Tests basic interactions with the Task model and related endpoints, ensuring 
// that tasks can be created, viewed, and updated properly by authorized users.

namespace Tests\Feature\Resources;

use App\Models\Task;
use App\Models\User;

test('tasks can be listed for authenticated users', function () {
    $user = User::factory()->create();
    Task::factory()->count(3)->create(['user_id' => $user->id]);

    $response = $this
        ->actingAs($user)
        ->get('/tasks');

    $response->assertOk();
});

test('authenticated users can create tasks', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post('/tasks', [
            'name' => 'Test Task',
            'description' => 'Task description',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/tasks');

    $this->assertDatabaseHas('tasks', [
        'name' => 'Test Task',
        'description' => 'Task description',
        'user_id' => $user->id,
    ]);
});

test('unauthenticated users cannot access tasks', function () {
    $response = $this->get('/tasks');

    $response->assertRedirect('/login');
});

