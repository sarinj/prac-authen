import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import Spinner from '../ui/spinner'
import { Card } from '../ui/card'
import { Pagination } from './pagination'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  currentPage: number
  pageSize: number
  totalPages: number
  onPaginationChange: (newPage: number, newPageSize: number) => void
}

export function PaginationTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  currentPage,
  pageSize,
  totalPages,
  onPaginationChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div>
      <Card>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-60 text-center'
                >
                  {isLoading ? (
                    <div className='flex h-full items-center justify-center'>
                      <Spinner className='h-6 w-6' />
                      <span className='ml-2'>Loading...</span>
                    </div>
                  ) : (
                    'No data'
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      <div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          pageSize={pageSize}
          onPaginationChange={(newPage, newPageSize) => {
            if (pageSize !== newPageSize) {
              onPaginationChange(1, newPageSize)
            } else {
              onPaginationChange(newPage, newPageSize)
            }
            table.setPageSize(newPageSize)
          }}
        />
      </div>
    </div>
  )
}
