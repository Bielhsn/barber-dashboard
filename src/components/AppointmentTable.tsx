import { Agendamento } from '../types';
import { Calendar, Clock, User, Phone, Scissors, UserCheck } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
    agendamentos: Agendamento[];
}

export default function AppointmentTable({ agendamentos }: Props) {
    return (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="p-3 text-left"><Calendar className="inline-block mr-2" /> Data</th>
                        <th className="p-3 text-left"><Clock className="inline-block mr-2" /> Hora</th>
                        <th className="p-3 text-left"><User className="inline-block mr-2" /> Cliente</th>
                        <th className="p-3 text-left"><Phone className="inline-block mr-2" /> Telefone</th>
                        <th className="p-3 text-left"><Scissors className="inline-block mr-2" /> Serviço</th>
                        <th className="p-3 text-left"><UserCheck className="inline-block mr-2" /> Barbeiro</th>
                    </tr>
                </thead>
                <tbody>
                    {agendamentos.map((a, index) => (
                        <tr 
                            key={index} 
                            className={`border-b transition-colors ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
                        >
                            <td className="p-3">
                                {format(new Date(a.data), 'dd/MM/yyyy')}
                            </td>
                            <td className="p-3">{a.hora}</td>
                            <td className="p-3">{a.nome}</td>
                            <td className="p-3">{a.telefone}</td>
                            <td className="p-3 font-semibold">{a.servico}</td>
                            <td className="p-3 font-semibold">{a.barbeiro}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}