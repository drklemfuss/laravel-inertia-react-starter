<?php

// Tests basic interactions with the Task model and related endpoints, ensuring 
// that tasks can be created, viewed, and updated properly by authorized users.

namespace Tests\Feature\Resources;

use App\Models\Task;
use App\Models\User;
use App\Enums\TaskStatus;
use App\Enums\TaskPriority;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

beforeEach(function () {
    // Set up roles and permissions
    Role::create(['name' => 'admin']);
    Role::create(['name' => 'user']);
    
    Permission::create(['name' => 'edit-task']);
    Permission::create(['name' => 'delete-task']);
    Permission::create(['name' => 'create-task']);
    Permission::create(['name' => 'view-task']);
    Permission::create(['name' => 'view-any-task']);

    $this->user = User::factory()->create()->assignRole('user');
    $this->admin = User::factory()->create()->assignRole('admin');
});

test('tasks can be listed for authenticated users', function () {
    $this->user->givePermissionTo('view-any-task');

    Task::factory()->count(3)->create(['user_id' => $this->user->id]);

    $response = $this->actingAs($this->user)->get('/tasks');

    $response->assertOk();
});

test('authenticated users can create tasks', function () {
    $this->user->givePermissionTo('create-task');

    $response = $this->actingAs($this->user)->post('/tasks', [
        'name' => 'Test Task',
        'description' => 'Task description',
    ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/tasks');

    $this->assertDatabaseHas('tasks', [
        'name' => 'Test Task',
        'description' => 'Task description',
        'user_id' => $this->user->id,
    ]);
});

test('unauthenticated users cannot access tasks', function () {
    $response = $this->get('/tasks');

    $response->assertRedirect('/login');
});

test('tasks can be updated by their creator', function () {
    $this->user->givePermissionTo('edit-task');

    $task = Task::factory()->create(['user_id' => $this->user->id]);

    $response = $this->actingAs($this->user)->put("/tasks/{$task->id}", [
        'name' => 'Updated Task Name',
        'description' => 'Updated description',
        'status' => TaskStatus::IN_PROGRESS->value,
        'priority' => TaskPriority::HIGH->value,
    ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/tasks');

    $this->assertDatabaseHas('tasks', [
        'id' => $task->id,
        'name' => 'Updated Task Name',
        'description' => 'Updated description',
        'status' => TaskStatus::IN_PROGRESS->value,
        'priority' => TaskPriority::HIGH->value,
    ]);
});

test('tasks cannot be updated by non-creators', function () {
    $this->user->givePermissionTo('edit-task');

    $anotherUser = User::factory()->create();
    $task = Task::factory()->create(['user_id' => $anotherUser->id]);

    $response = $this->actingAs($this->user)->put("/tasks/{$task->id}", [
        'name' => 'Attempted Update',
    ]);

    $response->assertForbidden();

    $this->assertDatabaseMissing('tasks', [
        'id' => $task->id,
        'name' => 'Attempted Update',
    ]);
});

test('tasks can be deleted by their creator', function () {
    $this->user->givePermissionTo('delete-task');

    $task = Task::factory()->create(['user_id' => $this->user->id]);

    $response = $this->actingAs($this->user)->delete("/tasks/{$task->id}");

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/tasks');

    $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
});

test('tasks cannot be deleted by non-creators', function () {
    $this->user->givePermissionTo('delete-task');

    $anotherUser = User::factory()->create();
    $task = Task::factory()->create(['user_id' => $anotherUser->id]);

    $response = $this->actingAs($this->user)->delete("/tasks/{$task->id}");

    $response->assertForbidden();

    $this->assertDatabaseHas('tasks', ['id' => $task->id]);
});

test('admins can view and manage any task', function () {
    $task = Task::factory()->create(['user_id' => $this->user->id]);

    $response = $this->actingAs($this->admin)->get("/tasks/{$task->id}");
    $response->assertOk();

    $response = $this->actingAs($this->admin)->delete("/tasks/{$task->id}");
    $response->assertRedirect('/tasks');

    $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
});

test('tasks can be viewed by authorized users', function () {
    $task = Task::factory()->create(['user_id' => $this->user->id]);

    $this->user->givePermissionTo('view-task');

    $response = $this->actingAs($this->user)->get(route('tasks.show', $task));

    $response->assertOk()
        ->assertInertia(fn ($page) =>
            $page->component('Tasks/Show')
                ->where('task.id', $task->id)
        );
});

test('tasks cannot be viewed by unauthorized users', function () {
    $task = Task::factory()->create(['user_id' => $this->user->id]);

    // The user does not have the 'view-task' permission
    $response = $this->actingAs($this->user)->get(route('tasks.show', $task));

    $response->assertForbidden();
});

