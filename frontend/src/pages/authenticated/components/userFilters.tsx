import { Input } from '@/components/ui/input'
import { UserFiltersProps } from './interface'
import { useDebounce } from '@/hooks/useDebounce'

export default function UserFilters({
  searchParams,
  onSearchParamsChange,
}: UserFiltersProps) {
  const { debounce } = useDebounce()
  return (
    <div>
      <Input
        onChange={e =>
          debounce(
            () =>
              onSearchParamsChange({
                ...searchParams,
                search: e.target.value,
              }),
            500
          )
        }
        className='md:w-[630px]'
        placeholder='Search for Name, Email'
      />
    </div>
  )
}
