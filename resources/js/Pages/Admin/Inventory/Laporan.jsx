import React from 'react';
import { Head } from '@inertiajs/react';

export default function Laporan({ monthlyReport }) {
  return (
    <>
      <Head title="Laporan Bulanan Inventory" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Laporan Bulanan Inventory</h1>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full table-auto border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Bulan</th>
                <th className="px-4 py-2 border">Total Masuk</th>
                <th className="px-4 py-2 border">Total Keluar</th>
                <th className="px-4 py-2 border">Estimasi Pendapatan</th>
              </tr>
            </thead>
            <tbody>
              {monthlyReport.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">Tidak ada data</td>
                </tr>
              ) : (
                monthlyReport.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{item.bulan}</td>
                    <td className="px-4 py-2 border text-green-600">{item.masuk}</td>
                    <td className="px-4 py-2 border text-red-600">{item.keluar}</td>
                    <td className="px-4 py-2 border font-semibold">Rp {item.pendapatan.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
