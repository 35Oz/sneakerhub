import React from 'react';

const styles = [
  { id: 'running', label: 'Running' },
  { id: 'tracking', label: 'Tracking' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'casual', label: 'Casual' },
  { id: 'sport', label: 'Sport' },
];


interface SearchFiltersProps {
  selectedStyle: string;
  selectedCategory: string;
  onStyleChange: (style: string) => void;
  onCategoryChange: (category: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  selectedStyle,
  onStyleChange,

}) => {
  return (
    <div className="space-y-6 p-4 bg-gray-800 rounded-lg">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">Estilos</h3>
        <div className="space-y-2">
          {styles.map((style) => (
            <label key={style.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedStyle === style.id}
                onChange={() => onStyleChange(selectedStyle === style.id ? 'all' : style.id)}
                className="rounded text-white bg-gray-700 border-gray-600 focus:ring-offset-gray-800 focus:ring-white"
              />
              <span className="text-gray-300">{style.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;