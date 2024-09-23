import { useMemo, useState } from 'react'
import { UserSearchParams } from './interface'
import { useUserActions } from '@/hooks/useUserActions'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import UserFilters from './userFilters'
import { PaginationTable } from '@/components/table/paginationTable'

export default function UserTable() {
  const { searchUsers } = useUserActions()
  const [filters, setFilters] = useState<UserSearchParams>({
    search: '',
    pageSize: 10,
    currentPage: 1,
  })

  const params = {
    search: filters.search,
    pageSize: filters.pageSize,
    page: filters.currentPage,
  }

  const { data, isLoading } = useQuery({
    queryKey: ['users', params],
    queryFn: async () => {
      const resp = await searchUsers(params)
      return resp
    },
  })

  const totalPage = data?.totalPages || 1
  const users = useMemo(() => data?.users || [], [data])

  function handleParamsChange(newParams: UserSearchParams) {
    setFilters(prevFilters => ({
      ...newParams,
      currentPage:
        newParams.search !== prevFilters.search ? 1 : newParams.currentPage,
    }))
  }

  const columns: ColumnDef<any>[] = [
    {
      header: 'User ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
  ]

  return (
    <div className='space-y-6'>
      <UserFilters
        searchParams={filters}
        onSearchParamsChange={handleParamsChange}
      />
      <PaginationTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        currentPage={filters.currentPage}
        pageSize={filters.pageSize}
        totalPages={totalPage}
        onPaginationChange={(page, pageSize) =>
          handleParamsChange({ ...filters, currentPage: page, pageSize })
        }
      />
    </div>
  )
}
