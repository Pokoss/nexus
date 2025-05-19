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
        Schema::create('persons', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('nin')->unique()->nullable();
            $table->string('phone');
            $table->bigInteger('district_id');
            $table->bigInteger('county_id');
            $table->bigInteger('subcounty_id');
            $table->bigInteger('parish_id');
            $table->bigInteger('village_id');
            $table->bigInteger('registered_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('persons');
    }
};
