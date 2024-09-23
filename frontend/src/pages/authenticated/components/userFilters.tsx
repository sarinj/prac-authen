import { Input } from '@/components/ui/input'
import { UserFiltersProps } from './interface'
import { useDebounce } from '@/hooks/useDebounce'

export default function UserFilters({
  searchParams,
  onSearchParamsChange,
}: UserFiltersProps) {
  const { debounce } = useDebounce()
  return (
    <div className='flex flex-wrap gap-x-4 gap-y-4'>
      <div className='flex flex-col'>
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
          className='w-[250px] md:w-[480px]'
          placeholder='Search for Name, Email'
        />
      </div>
    </div>
  )
}
