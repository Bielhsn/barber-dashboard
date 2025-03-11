import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/agendamentos')
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
            <div className="p-8 bg-white shadow-xl rounded-lg w-96 text-center transform transition-all hover:scale-105">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Login do Salão</h1>
                <button
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full font-semibold text-lg shadow-md 
                               transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-700"
                    onClick={handleLogin}
                >
                    Entrar
                </button>
            </div>
        </div>
    )
}
