import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskForm from './components/TaskForm';
import Homepage from './pages/Homepage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/mascotas/nueva" element={<TaskForm />} />
        <Route path="/mascotas/editar/:id" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
