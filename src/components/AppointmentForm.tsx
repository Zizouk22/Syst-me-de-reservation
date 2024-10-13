import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Provider } from '../types';

interface AppointmentFormProps {
  selectedProvider: Provider | null;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ selectedProvider }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [service, setService] = useState('');

  useEffect(() => {
    if (selectedProvider && date) {
      // Simuler la récupération des créneaux disponibles
      const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
      setAvailableTimes(times);
    } else {
      setAvailableTimes([]);
    }
  }, [selectedProvider, date]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProvider) {
      alert('Veuillez sélectionner un prestataire');
      return;
    }
    console.log('Rendez-vous réservé:', { provider: selectedProvider.name, service, date, time });
    alert('Rendez-vous réservé avec succès!');
    setDate('');
    setTime('');
    setService('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Réserver un Rendez-vous</h2>
      {selectedProvider ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="provider" className="block text-sm font-medium text-gray-700">
              Prestataire sélectionné
            </label>
            <input
              type="text"
              id="provider"
              value={`${selectedProvider.name} - ${selectedProvider.specialty}`}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              disabled
            />
          </div>
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">
              Service
            </label>
            <input
              type="text"
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Heure
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Sélectionnez une heure</option>
                {availableTimes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
          >
            Réserver
          </button>
        </form>
      ) : (
        <p className="text-gray-600">Veuillez sélectionner un prestataire pour réserver un rendez-vous.</p>
      )}
    </div>
  );
};

export default AppointmentForm;