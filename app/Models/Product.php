<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'products';
    protected $fillable = [
        'code',
        'name',
        'stock',
        'product_image',
        'price',
        'description',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected static function booted() {
        static::creating(function ($product) {
            do {
                $code =  now()->format('Ymd') . '-' . mt_rand(100000, 999999);
            } while (self::where('code', $code)->exists());

            $product->code = $code;
        });
    }

    public function createdByUser()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedByUser()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
