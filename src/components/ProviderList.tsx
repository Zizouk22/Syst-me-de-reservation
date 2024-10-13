import React from 'react';
import { User, Star } from 'lucide-react';
import { Provider } from '../types';

const providers: Provider[] = [
  { id: 1, name: 'Dr. Smith', specialty: 'Dentiste', rating: 4.5 },
  { id: 2, name: 'Mme. Johnson', specialty: 'Coiffeuse', rating: 4.8 },
  { id: 3, name: 'M. Brown', specialty: 'Masseur', rating: 4.2 },
  { id: 4, name: 'Dr. Davis', specialty: 'Dentiste', rating: 4.7 },
  { id: 5, name: 'Mme. Wilson', specialty: 'Coiffeuse', rating: 4.6 },
];

interface ProviderListProps {
  onSelectProvider: (provider: Provider) => void;
  searchTerm: string;
  filterSpecialty: string;
}

const ProviderList: React.FC<ProviderListProps> = ({
  onSelectProvider,
  searchTerm,
  filterSpecialty,
}) => {
  const filteredProviders = providers.filter(
    (provider) =>
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterSpecialty === '' || provider.specialty === filterSpecialty)
  );

  return (
    <ul className="space-y-4">
      {filteredProviders.map((provider) => (
        <li
          key={provider.id}
          className="bg-gray-50 p-4 rounded-md shadow cursor-pointer hover:bg-gray-100 transition-all duration-200"
          onClick={() => onSelectProvider(provider)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <User className="w-8 h-8 mr-3 text-blue-500" />
              <div>
                <h3 className="font-semibold text-lg">{provider.name}</h3>
                <p className="text-gray-600">{provider.specialty}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span>{provider.rating.toFixed(1)}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProviderList;