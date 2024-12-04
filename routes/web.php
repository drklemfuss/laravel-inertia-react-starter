<?php

use App\Http\Controllers\UserManagement\ProfileController;
use App\Http\Controllers\Resources\TaskController;
use App\Http\Controllers\Resources\CountryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing/Home', [

    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    // Resource creates routes for standard CRUD operations
    Route::resource('tasks', TaskController::class);
});

Route::middleware('auth')->group(function () {
    Route::resource('countries', CountryController::class)->only(['index', 'show']);
});

require __DIR__.'/auth.php';
