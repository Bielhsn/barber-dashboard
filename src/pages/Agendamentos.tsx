import { useEffect, useState } from 'react';
import { Agendamento } from '../types';
import Navbar from '../components/Navbar';
import AppointmentTable from '../components/AppointmentTable';

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare global {
    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}

export default function Agendamentos() {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/agendamentos`)
            .then(res => res.json())
            .then(data => setAgendamentos(data))
            .catch(() => alert('Erro ao buscar agendamentos'));
    }, []);        

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📅 Agendamentos</h1>
                <AppointmentTable agendamentos={agendamentos} />
            </div>
        </div>
    );
}
