'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatCurrency, formatPrice } from '@/utils/formatters';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
}

export interface DataTableProps {
  columns: TableColumn[];
  data: any[];
  title?: string;
  emptyMessage?: string;
  className?: string;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  title,
  emptyMessage = 'No data available',
  className = '',
}) => {
  const getAlignmentClass = (align?: string) => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  return (
    <Card className={`w-full h-full flex flex-col ${className}`} padding="none">
      {title && (
        <div className="px-4 py-3 border-b border-border flex-shrink-0">
          <h3 className="text-base font-semibold text-text-primary">{title}</h3>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-background-sidebar border-b border-border sticky top-0 z-10">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-xs font-medium text-text-muted uppercase tracking-wider ${getAlignmentClass(column.align)}`}
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-text-muted"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className="hover:bg-background-hover transition-colors"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-4 py-3 text-sm text-text-primary ${getAlignmentClass(column.align)}`}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export const positionsColumns: TableColumn[] = [
  { 
    key: 'symbol', 
    label: 'Symbol', 
    width: '15%' 
  },
  {
    key: 'type',
    label: 'Type',
    width: '10%',
    render: (value) => (
      <Badge variant={value === 'BUY' ? 'success' : 'error'}>
        {value}
      </Badge>
    ),
  },
  {
    key: 'volume',
    label: 'Volume',
    width: '12%',
    align: 'right',
  },
  {
    key: 'openPrice',
    label: 'Open Price',
    width: '12%',
    align: 'right',
    render: (value) => formatPrice(value),
  },
  {
    key: 'currentPrice',
    label: 'Current Price',
    width: '12%',
    align: 'right',
    render: (value) => formatPrice(value),
  },
  {
    key: 'stopLoss',
    label: 'S/L',
    width: '10%',
    align: 'right',
    render: (value) => (value ? formatPrice(value) : '-'),
  },
  {
    key: 'takeProfit',
    label: 'T/P',
    width: '10%',
    align: 'right',
    render: (value) => (value ? formatPrice(value) : '-'),
  },
  {
    key: 'profit',
    label: 'Profit',
    width: '12%',
    align: 'right',
    render: (value) => (
      <span className={value >= 0 ? 'text-success' : 'text-error'}>
        {formatCurrency(value)}
      </span>
    ),
  },
  {
    key: 'openTime',
    label: 'Open Time',
    width: '15%',
    render: (value) => new Date(value).toLocaleString(),
  },
];

export default DataTable;