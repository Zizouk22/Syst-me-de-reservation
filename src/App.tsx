import React, { useState } from 'react';
import { Calendar, Search } from 'lucide-react';
import AppointmentList from './components/AppointmentList';
import AppointmentForm from './components/AppointmentForm';
import ProviderList from './components/ProviderList';
import SearchBar from './components/SearchBar';
import { Provider } from './types';

function App() {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 flex items-center justify-center">
          <Calendar className="mr-2" />
          Système de Réservation
        </h1>
        <p className="text-gray-600">Réservez vos rendez-vous en ligne</p>
      </header>
      <main className="w-full max-w-6xl bg-white rounded-lg shadow-md p-6">
        <SearchBar onSearch={setSearchTerm} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Search className="mr-2" />
              Prestataires
            </h2>
            <select
              className="w-full p-2 mb-4 border rounded"
              onChange={(e) => setFilterSpecialty(e.target.value)}
              value={filterSpecialty}
            >
              <option value="">Toutes les spécialités</option>
              <option value="Dentiste">Dentiste</option>
              <option value="Coiffeur">Coiffeur</option>
              <option value="Masseur">Masseur</option>
            </select>
            <ProviderList
              onSelectProvider={setSelectedProvider}
              searchTerm={searchTerm}
              filterSpecialty={filterSpecialty}
            />
          </div>
          <AppointmentForm selectedProvider={selectedProvider} />
          <AppointmentList />
        </div>
      </main>
    </div>
  );
}

export default App;