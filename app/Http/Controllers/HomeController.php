<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $products = Product::latest()->take(8)->get();

        return Inertia::render('Home', [
            'products' => $products
        ]);
    }

    
    public function allProducts()
    {
        $products = Product::orderBy('created_at', 'desc')->get();

        $categories = Product::select('kategori')->distinct()->pluck('kategori')->toArray();

        return Inertia::render('Produk/AllProducts', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }
}
