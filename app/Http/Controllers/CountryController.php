<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Policies\CountryPolicy;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests; 

class CountryController extends Controller
{
    use AuthorizesRequests;

    public function __construct()
    {
        // Apply the policy to all actions in this controller
        $this->authorizeResource(Country::class, 'country');
    }

    // Display a list of countries
    public function index()
    {
        $countries = Country::all(); // Or use pagination if needed
        return Inertia::render('Countries/Index', [
            'countries' => $countries,
        ]);
    }

    // Display a single country
    public function show(Country $country)
    {
        $this->authorize('view', $country); // Ensure the user is authorized to view this country

        return Inertia::render('Countries/Show', [
            'country' => $country,
        ]);
    }

}

