<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchasesTable extends Migration
{
    public function up(): void
    {
        Schema::create('purchases', function (Blueprint $table) {
    $table->id();
    $table->string('nama');
    $table->text('alamat');
    $table->string('telepon');
    $table->enum('pembayaran', ['cash', 'transfer']);
    $table->bigInteger('total');
    $table->timestamps();
});
    }
    
    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
}
