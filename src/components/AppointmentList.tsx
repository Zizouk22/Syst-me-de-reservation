import React, { useState } from 'react';
import { Clock, Calendar, User, X, Edit2 } from 'lucide-react';
import { Appointment } from '../types';

const initialAppointments: Appointment[] = [
  { id: 1, provider: 'Dr. Smith', service: 'Consultation dentaire', date: '2024-03-15', time: '14:00' },
  { id: 2, provider: 'Mme. Johnson', service: 'Coupe de cheveux', date: '2024-03-16', time: '10:30' },
  { id: 3, provider: 'M. Brown', service: 'Massage relaxant', date: '2024-03-17', time: '16:00' },
];

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  const handleDelete = (id: number) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
  };

  const handleSave = (updatedAppointment: Appointment) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === updatedAppointment.id ? updatedAppointment : appointment
      )
    );
    setEditingAppointment(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Mes Rendez-vous</h2>
      <ul className="space-y-4">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="bg-gray-50 p-4 rounded-md shadow">
            {editingAppointment?.id === appointment.id ? (
              <AppointmentEditForm
                appointment={editingAppointment}
                onSave={handleSave}
                onCancel={() => setEditingAppointment(null)}
              />
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{appointment.service}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(appointment)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 mt-2">
                  <User className="w-4 h-4 mr-2" />
                  <span>{appointment.provider}</span>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{appointment.time}</span>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface AppointmentEditFormProps {
  appointment: Appointment;
  onSave: (updatedAppointment: Appointment) => void;
  onCancel: () => void;
}

const AppointmentEditForm: React.FC<AppointmentEditFormProps> = ({
  appointment,
  onSave,
  onCancel,
}) => {
  const [editedAppointment, setEditedAppointment] = useState(appointment);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedAppointment({ ...editedAppointment, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedAppointment);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        name="service"
        value={editedAppointment.service}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="provider"
        value={editedAppointment.provider}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        name="date"
        value={editedAppointment.date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="time"
        name="time"
        value={editedAppointment.time}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
};

export default AppointmentList;