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
        Schema::create('countries', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('capital')->nullable();
            $table->string('citizenship')->nullable();
            $table->char('country_code', 3)->nullable();
            $table->string('currency')->nullable();
            $table->string('currency_code')->nullable();
            $table->string('currency_sub_unit')->nullable();
            $table->integer('currency_decimals')->nullable();
            $table->string('full_name')->nullable();
            $table->char('iso_3166_2', 2)->nullable();
            $table->char('iso_3166_3', 3)->nullable();
            $table->string('name');
            $table->char('region_code', 3)->nullable();
            $table->char('sub_region_code', 3)->nullable();
            $table->boolean('eea')->default(false);
            $table->string('calling_code')->nullable();
            $table->char('currency_symbol', 3)->nullable();
            $table->string('flag')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('countries');
    }
};
