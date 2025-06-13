<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
{
    $sortField = $request->get('sort', 'nama'); // default: nama
    $sortDirection = $request->get('direction', 'asc'); // default: asc

    if (!in_array($sortField, ['nama', 'kategori', 'harga', 'stok'])) {
        $sortField = 'nama';
    }

    if (!in_array($sortDirection, ['asc', 'desc'])) {
        $sortDirection = 'asc';
    }

    $products = Product::orderBy($sortField, $sortDirection)->get();

    return Inertia::render('Admin/Produk/Index', [
        'products' => $products,
        'sort' => [
            'sort' => $sortField,
            'direction' => $sortDirection,
        ],
    ]);
}


    public function create()
    {
        return Inertia::render('Admin/Produk/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kategori' => 'required|string|in:sembako,snack,frozen',
            'harga' => 'required|integer|min:0',
            'stok' => 'required|integer|min:0',
            'gambar' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('gambar')) {
            $validated['gambar'] = $request->file('gambar')->store('produk', 'public');
        }

        Product::create($validated);

        return redirect()->route('produk.index')->with('success', 'Produk berhasil ditambahkan');
    }

    public function edit(Product $produk)
    {
        return Inertia::render('Admin/Produk/Edit', [
            'product' => $produk,
        ]);
    }

    public function update(Request $request, Product $produk)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kategori' => 'required|in:sembako,snack,frozen', //nambah kategori
            'harga' => 'required|integer|min:0',
            'stok' => 'required|integer|min:0',
            'gambar' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('gambar')) {
            $validated['gambar'] = $request->file('gambar')->store('produk', 'public');
        }

        $produk->update($validated);

        return redirect()->route('produk.index')->with('success', 'Produk berhasil diperbarui');
    }

    public function destroy(Product $produk)
    {
        $produk->delete();

        return redirect()->route('produk.index')->with('success', 'Produk berhasil dihapus');
    }
}
