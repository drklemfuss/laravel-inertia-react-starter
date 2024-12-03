<?php

// Tests basic interactions with the Country model and related endpoints, 
// ensuring that country data can be viewed and accessed correctly.

namespace Tests\Feature\Resources;

use App\Models\Country;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

test('countries can be viewed by authenticated users', function () {
    $role = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'web']);
    $permission = Permission::firstOrCreate(['name' => 'view-any-country', 'guard_name' => 'web']);
    $role->givePermissionTo($permission);

    $user = User::factory()->create();
    $user->assignRole($role);

    $response = $this
        ->actingAs($user)
        ->get('/countries');

    $response->assertOk();
});

test('unauthenticated users cannot access countries', function () {
    $response = $this->get('/countries');

    $response->assertRedirect('/login');
});
