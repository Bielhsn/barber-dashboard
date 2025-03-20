import { useEffect, useState } from "react";
import { Agendamento } from "../types";
import Navbar from "../components/Navbar";
import AppointmentTable from "../components/AppointmentTable";
import { format, parseISO } from "date-fns";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts";

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
    const [servicosPorMes, setServicosPorMes] = useState<any[]>([]);
    const [faturamentoPorMes, setFaturamentoPorMes] = useState<any[]>([]);

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/agendamentos`);
                const data: Agendamento[] = await response.json();
                setAgendamentos(data);
            } catch (error) {
                console.error("Erro ao buscar agendamentos:", error);
            }
        };

        fetchAgendamentos();
    }, []);

    useEffect(() => {
        if (agendamentos.length > 0) {
            processarDados(agendamentos);
        }
    }, [agendamentos]);

    const processarDados = (agendamentos: Agendamento[]) => {
        const meses: Record<string, { corte: number; barba: number; combo: number; total: number }> = {};

        agendamentos.forEach(({ data, servico }) => {
            const mesAno = format(parseISO(data), "MM/yyyy");

            if (!meses[mesAno]) {
                meses[mesAno] = { corte: 0, barba: 0, combo: 0, total: 0 };
            }

            switch (servico) {
                case "Corte Masculino":
                    meses[mesAno].corte += 1;
                    meses[mesAno].total += 40;
                    break;
                case "Barba Simples":
                    meses[mesAno].barba += 1;
                    meses[mesAno].total += 40;
                    break;
                case "Corte Masculino + Barba Simples":
                    meses[mesAno].combo += 1;
                    meses[mesAno].total += 60;
                    break;
                default:
                    break;
            }
        });

        const servicosArray = Object.keys(meses).map((mes) => ({
            mes,
            "Corte Masculino": meses[mes].corte,
            "Barba Simples": meses[mes].barba,
            "Corte + Barba": meses[mes].combo,
        }));

        const faturamentoArray = Object.keys(meses).map((mes) => ({
            mes,
            faturamento: meses[mes].total,
        }));

        setServicosPorMes(servicosArray);
        setFaturamentoPorMes(faturamentoArray);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📅 Agendamentos</h1>
                
                {/* Tabela de Agendamentos */}
                <AppointmentTable agendamentos={agendamentos} />

                {/* Gráficos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    {/* Gráfico de Barras */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">📊 Serviços Prestados por Mês</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={servicosPorMes}>
                                <XAxis dataKey="mes" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Corte Masculino" fill="#4CAF50" />
                                <Bar dataKey="Barba Simples" fill="#2196F3" />
                                <Bar dataKey="Corte + Barba" fill="#FF9800" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Gráfico de Linha */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">📈 Faturamento Mensal</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={faturamentoPorMes}>
                                <XAxis dataKey="mes" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="faturamento" stroke="#FF5722" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}