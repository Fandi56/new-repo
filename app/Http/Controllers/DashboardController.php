<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $products = Product::where('is_active', true)->latest()->get();
        
        return Inertia::render('Dashboard', [
            'products' => $products,
        ]);
    }
}
