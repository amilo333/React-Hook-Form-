import { Navigate, Route, Routes } from 'react-router-dom';
import UserFormPage from './pages/UserFormPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/user-form" replace />} />
      <Route path="/user-form" element={<UserFormPage />} />
    </Routes>
  );
}

export default App;
