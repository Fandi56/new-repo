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
        Schema::create('products', function (Blueprint $table) {
            $table->charset = 'utf8';
            $table->collation = 'utf8_general_ci';
            $table->uuid('id')->primary();
            $table->string('code', 20)->notNullable();
            $table->string('name')->notNullable();
            $table->bigInteger('stock')->default(0);
            $table->text('product_image')->nullable();
            $table->text('description')->notNullable();
            $table->bigInteger('price')->default(0);
            $table->boolean('is_active')->default(false);
            $table->bigInteger('created_by')->nullable()->comment('user_id');
            $table->bigInteger('updated_by')->nullable()->comment('user_id');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
