export interface UserFiltersProps {
  searchParams: UserSearchParams
  onSearchParamsChange: (newSearchParams: UserSearchParams) => void
}

export type UserSearchParams = {
  search?: string
  currentPage: number
  pageSize: number
}
