import React, { ChangeEvent } from 'react'
import { IconSearch } from '@tabler/icons-react'

interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({ placeholder = 'Search...', value, onChange }: SearchInputProps) => {
  return (
    <div className="relative w-full">
      <IconSearch 
        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" 
        stroke={1.5}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-200 
                 focus:outline-none focus:ring-2 focus:ring-[#f792c5] focus:border-transparent
                 placeholder-gray-400 "
      />
    </div>
  )
}

export default SearchInput