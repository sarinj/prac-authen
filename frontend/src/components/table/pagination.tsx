import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'

import { Button } from '../ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface DataTablePaginationProps {
  totalPages: number
  currentPage: number
  pageSize: number
  onPaginationChange: (newPage: number, newPageSize: number) => void
}

export function Pagination({
  totalPages,
  currentPage,
  pageSize,
  onPaginationChange,
}: DataTablePaginationProps) {
  return (
    <div className='mt-4 flex items-center justify-between px-2'>
      <div className='ml-auto flex items-center space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={value => {
              onPaginationChange(currentPage, Number(value))
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map(pageSizeOption => (
                <SelectItem key={pageSizeOption} value={`${pageSizeOption}`}>
                  {pageSizeOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Page {currentPage} of {totalPages}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => onPaginationChange(1, pageSize)}
            disabled={currentPage === 1}
          >
            <DoubleArrowLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => onPaginationChange(currentPage - 1, pageSize)}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => onPaginationChange(currentPage + 1, pageSize)}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => onPaginationChange(totalPages, pageSize)}
            disabled={currentPage === totalPages}
          >
            <DoubleArrowRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
