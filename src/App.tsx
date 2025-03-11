import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Agendamentos from './pages/Agendamentos'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/agendamentos" element={<Agendamentos />} />
        </Routes>
    )
}

export default App
