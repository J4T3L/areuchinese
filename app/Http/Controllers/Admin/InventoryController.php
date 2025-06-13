<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\Product;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Inventory::with('product')->latest();

        // Filter berdasarkan bulan
        if ($request->has('month') && is_numeric($request->month)) {
            $query->whereMonth('created_at', $request->month);
        }

        // Filter berdasarkan tipe (masuk/keluar)
        if ($request->has('tipe') && in_array($request->tipe, ['masuk', 'keluar'])) {
            $query->where('tipe', $request->tipe);
        }

        return Inertia::render('Admin/Inventory/Index', [
            'products' => Product::all(),
            'logs' => $query->get(),
            'purchases' => Purchase::latest()->get(),
            'filters' => $request->only('month', 'tipe'),
        ]);
    }

    public function storeMasuk(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'jumlah' => 'required|integer|min:1',
            'keterangan' => 'nullable|string',
        ]);

        Inventory::create([
            'product_id' => $data['product_id'],
            'jumlah' => $data['jumlah'],
            'tipe' => 'masuk',
            'keterangan' => $data['keterangan'],
        ]);

        Product::find($data['product_id'])->increment('stok', $data['jumlah']);

        return redirect()->route('inventory.index');
    }

    public function storeKeluar(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'jumlah' => 'required|integer|min:1',
            'keterangan' => 'nullable|string',
        ]);

        $product = Product::find($data['product_id']);

        if ($product->stok < $data['jumlah']) {
            return back()->withErrors(['jumlah' => 'Stok tidak cukup']);
        }

        Inventory::create([
            'product_id' => $data['product_id'],
            'jumlah' => $data['jumlah'],
            'tipe' => 'keluar',
            'keterangan' => $data['keterangan'],
        ]);

        $product->decrement('stok', $data['jumlah']);

        return redirect()->route('inventory.index');
    }

    public function report()
    {
        $report = Inventory::with('product')
            ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as bulan, tipe, product_id, SUM(jumlah) as total_jumlah")
            ->groupBy('bulan', 'tipe', 'product_id')
            ->orderBy('bulan')
            ->get()
            ->groupBy('bulan')
            ->map(function ($items, $bulan) {
                $masuk = 0;
                $keluar = 0;
                $pendapatan = 0;

                foreach ($items as $item) {
                    if ($item->tipe === 'masuk') {
                        $masuk += $item->total_jumlah;
                    } elseif ($item->tipe === 'keluar') {
                        $keluar += $item->total_jumlah;
                        $pendapatan += $item->total_jumlah * ($item->product->harga ?? 0);
                    }
                }

                return [
                    'bulan' => $bulan,
                    'masuk' => $masuk,
                    'keluar' => $keluar,
                    'pendapatan' => $pendapatan,
                ];
            })
            ->values();

        return Inertia::render('Admin/Inventory/Laporan', [
            'monthlyReport' => $report,
        ]);
    }

    public function download(Request $request)
    {
        $month = $request->query('month');
        $tipe = $request->query('tipe');

        if (!$month || !preg_match('/^\d{1,2}$/', $month)) {
            return abort(400, 'Format bulan tidak valid.');
        }

        $query = Inventory::with('product')->whereMonth('created_at', $month);

        if ($tipe && in_array($tipe, ['masuk', 'keluar'])) {
            $query->where('tipe', $tipe);
        }

        $logs = $query->get();

        $csv = "Tanggal,Produk,Tipe,Jumlah,Keterangan\n";

        foreach ($logs as $log) {
            $csv .= sprintf(
                "\"%s\",\"%s\",\"%s\",%d,\"%s\"\n",
                $log->created_at->format('Y-m-d H:i'),
                $log->product->nama,
                ucfirst($log->tipe),
                $log->jumlah,
                $log->keterangan ?? '-'
            );
        }

        $filename = "riwayat_inventory_{$tipe}_bulan_{$month}.csv";

        return response($csv)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', "attachment; filename=\"$filename\"");
    }

    public function downloadPurchase(Request $request)
{
    $month = $request->query('month');
    $pembayaran = $request->query('pembayaran');

    if (!$month || !preg_match('/^\d{1,2}$/', $month)) {
        return abort(400, 'Format bulan tidak valid.');
    }

    $query = Purchase::whereMonth('created_at', $month);

    if ($pembayaran && in_array($pembayaran, ['cash', 'transfer'])) {
        $query->where('pembayaran', $pembayaran);
    }

    $purchases = $query->latest()->get();

    $csv = "Tanggal,Nama Pembeli,Alamat,No HP,Metode Pembayaran,Total Pembelian\n";

    foreach ($purchases as $purchase) {
        $csv .= sprintf(
            "\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",%d\n",
            $purchase->created_at->format('Y-m-d H:i'),
            $purchase->nama,
            $purchase->alamat,
            $purchase->telepon,
            ucfirst($purchase->pembayaran),
            $purchase->total
        );
    }

    $filename = "riwayat_pembelian_bulan_{$month}";

    if ($pembayaran && in_array($pembayaran, ['cash', 'transfer'])) {
        $filename .= "_{$pembayaran}";
    }

    $filename .= ".csv";

    return response($csv)
        ->header('Content-Type', 'text/csv')
        ->header('Content-Disposition', "attachment; filename=\"$filename\"");
}


}
