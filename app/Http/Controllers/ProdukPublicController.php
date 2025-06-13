<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProdukPublicController extends Controller
{
    public function index()
    {
        $products = Product::all();
        $categories = Product::select('kategori')->distinct()->pluck('kategori');

        return Inertia::render('Produk', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function show(Product $product)
    {
        return Inertia::render('ProdukShow', [
            'product' => $product,
        ]);
    }
}
