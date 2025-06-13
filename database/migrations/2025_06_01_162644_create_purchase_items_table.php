<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchaseItemsTable extends Migration
{
    public function up(): void
    {
        Schema::create('purchase_items', function (Blueprint $table) {
    $table->id();
    $table->foreignId('purchase_id')->constrained('purchases')->onDelete('cascade');
    $table->foreignId('product_id')->constrained('products')->onDelete('restrict');
    $table->integer('qty');
    $table->bigInteger('harga_satuan');
    $table->timestamps();
});

    }

    public function down(): void
    {
        Schema::dropIfExists('purchase_items');
    }
}
