<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Inventory;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $products = Product::all();
        $totalStok = $products->sum('stok');
        $kategoriCount = $products->pluck('kategori')->unique()->count();

        $logs = Inventory::with('product')->latest()->limit(50)->get();

        return Inertia::render('Admin/Dashboard', [
            'products' => $products,
            'logs' => $logs,
            'totalStok' => $totalStok,
            'kategoriCount' => $kategoriCount,
        ]);
    }
}
