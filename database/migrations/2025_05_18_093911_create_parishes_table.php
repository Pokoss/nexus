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
        Schema::create('parishes', function (Blueprint $table) {
            $table->id();
            $table->string('parish');
            $table->bigInteger('district_id');
            $table->bigInteger('county_id');
            $table->bigInteger('subcounty_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parishes');
    }
};
