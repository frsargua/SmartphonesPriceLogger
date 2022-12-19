<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prices', function (Blueprint $table) {
              $table->increments('id');
            $table->unsignedInteger('model_id');
            $table->date('date_added');
            $table->double('price');
            $table->timestamps();
            $table-> foreign('model_id')->references('id')->on('phones')->onDelete(('cascade'))->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prices');
    }
};
