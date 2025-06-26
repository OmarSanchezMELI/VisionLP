// src/components/NotificationToast.tsx
"use client";

import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from '@/components/ui/table';

// Helper to format currency values
const formatCurrency = (value: number | string) => {
  if (typeof value === 'string' && value.startsWith('$')) {
    return value; // Already formatted
  }
  if (typeof value === 'number') {
    return `$${Math.round(value).toLocaleString('en-US')}`;
  }
  return value;
};


export function NotificationToast({ notification }: { notification: any }) {
  const { date, metrics, cancelledPostPacking } = notification;

  return (
    <div className="w-full max-w-md p-1">
      <h3 className="text-lg font-bold">🚀 Actualización de Datos de Daily 🚀</h3>
      <p className="text-sm text-muted-foreground mb-3">Fecha: {date}</p>

      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-base mb-1">Métricas Clave</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {metrics?.map((metric: { name: string; value: string }, index: number) => (
              <li key={index}>
                <span className="font-medium">{metric.name}:</span> {metric.value}
              </li>
            ))}
          </ul>
        </div>

        {cancelledPostPacking && (
          <div>
            <h4 className="font-semibold text-base mb-1">Cancelled Post Packing</h4>
            <Table className="bg-muted/50 rounded-md">
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Concepto</TableHead>
                  <TableHead className="text-right font-bold">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cancelledPostPacking.map((row: (string | number)[], rowIndex: number) => (
                  <TableRow key={rowIndex}>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell className="text-right font-mono">{formatCurrency(row[1])}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
