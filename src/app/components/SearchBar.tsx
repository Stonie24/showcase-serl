import React, { useState } from 'react';
import clsx from 'clsx';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // Update this import

type SearchBarProps = React.ComponentPropsWithoutRef<'input'> & {
  placeholder?: string;
  onSearch?: (query: string) => void;
};

export function SearchBar({ className, placeholder = 'Search...', onSearch, ...props }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(query);
      console.log(query)
    }
  };

  className = clsx(
    'flex items-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500',
    className
  );

  return (
    <div className={className}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="flex-grow p-2 border-none outline-none"
        {...props}
      />
      <button
        type="button"
        onClick={() => onSearch && onSearch(query)}
        className="p-2 text-gray-600 hover:text-gray-900"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
