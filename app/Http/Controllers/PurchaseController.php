<?php
namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Purchase;
use App\Models\PurchaseItem;
use App\Models\Inventory; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PurchaseController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string|max:1000',
            'telepon' => 'required|string|max:20',
            'pembayaran' => 'required|in:cash,transfer',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.qty' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();

        try {
            $total = 0;
            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);
                if ($product->stok < $item['qty']) {
                    return response()->json([
                        'message' => "Stok produk {$product->nama} tidak cukup."
                    ], 422);
                }
                $total += $product->harga * $item['qty'];
            }

            $purchase = Purchase::create([
                'nama' => $request->nama,
                'alamat' => $request->alamat,
                'telepon' => $request->telepon,
                'pembayaran' => $request->pembayaran,
                'total' => $total,
            ]);

            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);

                PurchaseItem::create([
                    'purchase_id' => $purchase->id,
                    'product_id' => $product->id,
                    'qty' => $item['qty'],
                    'harga_satuan' => $product->harga,
                ]);

                // Kurangi stok produk
                $product->decrement('stok', $item['qty']);

                Inventory::create([
                    'product_id' => $product->id,
                    'jumlah' => $item['qty'],
                    'tipe' => 'keluar',
                    'source' => 'checkout',
                    'keterangan' => 'Pengurangan stok dari checkout',
                ]);
            }

            DB::commit();

            return response()->json(['message' => 'Checkout berhasil'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Checkout gagal', 'error' => $e->getMessage()], 500);
        }
    }
}
