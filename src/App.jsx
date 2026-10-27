import { useState } from 'react';
import UserForm from './components/UserForm';

function App() {
  const [submittedUser, setSubmittedUser] = useState(null);

  return (
    <main className="page">
      <UserForm onSubmit={setSubmittedUser} />

      {submittedUser && (
        <p className="success" role="status">
          Gửi thông tin thành công cho {submittedUser.name}!
        </p>
      )}
    </main>
  );
}

export default App;
