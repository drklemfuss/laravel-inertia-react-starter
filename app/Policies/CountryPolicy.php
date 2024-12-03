<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Country;

class CountryPolicy
{
    public function viewAny(User $user)
    {
        // If the user has the permission or is an admin, allow them to view all countries
        return $user->hasRole('admin') || $user->hasPermissionTo('view-any-country');
    }

    public function view(User $user, Country $country)
    {
        // Allow the user to view a country if they have the permission
        return $user->hasRole('admin') || $user->hasPermissionTo('view-country');
    }

    public function create(User $user)
    {
        return false; // Explicitly deny all users
    }

    public function update(User $user, Country $country)
    {
        return false; // Explicitly deny all users
    }

    public function delete(User $user, Country $country)
    {
        return false; // Explicitly deny all users
    }
}

