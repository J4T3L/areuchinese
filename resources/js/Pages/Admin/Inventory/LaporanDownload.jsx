import React from 'react';
import { usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function LaporanDownload() {
  const { laporan, auth } = usePage().props;

  const generatePDF = () => {
    const tableBody = [
      [
        { text: 'No', bold: true },
        { text: 'Tanggal', bold: true },
        { text: 'Nama Produk', bold: true },
        { text: 'Tipe', bold: true },
        { text: 'Jumlah', bold: true },
        { text: 'Keterangan', bold: true },
      ],
      ...laporan.map((item, index) => [
        index + 1,
        new Date(item.created_at).toLocaleDateString(),
        item.product?.nama || '-',
        item.tipe,
        item.jumlah,
        item.keterangan || '-',
      ]),
    ];

    const docDefinition = {
      content: [
        { text: 'Laporan Inventory Barang', style: 'header' },
        { text: `Dicetak oleh: ${auth.name}`, margin: [0, 0, 0, 10] },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*', 'auto', 'auto', '*'],
            body: tableBody,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
      },
      defaultStyle: {
        font: 'Helvetica',
      },
    };

    pdfMake.createPdf(docDefinition).download('laporan-inventory.pdf');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Laporan Data Transaksi Inventory</h1>
        <Button onClick={generatePDF}>Download PDF</Button>
      </div>

      <div className="overflow-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 border">No</th>
              <th className="px-3 py-2 border">Tanggal</th>
              <th className="px-3 py-2 border">Produk</th>
              <th className="px-3 py-2 border">Tipe</th>
              <th className="px-3 py-2 border">Jumlah</th>
              <th className="px-3 py-2 border">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {laporan.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="px-3 py-2 border text-center">{index + 1}</td>
                <td className="px-3 py-2 border">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="px-3 py-2 border">{item.product?.nama}</td>
                <td className="px-3 py-2 border capitalize">{item.tipe}</td>
                <td className="px-3 py-2 border text-center">{item.jumlah}</td>
                <td className="px-3 py-2 border">{item.keterangan || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
