<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Link to users table
            $table->string('status', 20)->default('pending'); // Status as a string enum
            $table->string('priority', 20)->default('medium'); // Priority as a string enum
            $table->json('tags')->nullable(); // JSON for tags
            $table->date('due_date')->nullable();
            $table->decimal('estimated_hours', 5, 2)->nullable();
            $table->decimal('actual_hours', 5, 2)->nullable();
            $table->integer('progress')->default(0); // 0-100 percentage
            $table->integer('effort_score')->nullable(); // Effort score
            $table->integer('urgency_score')->nullable(); // Urgency score
            $table->timestamps();

            // Indexes for common filtering columns
            $table->index(['status', 'priority']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};

