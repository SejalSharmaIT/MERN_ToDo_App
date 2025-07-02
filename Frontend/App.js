import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import TodoApp from './components/TodoApp';
import './App.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const showHeader = location.pathname === '/home';
  const showLogout = token && location.pathname === '/home';

  if (!showHeader) return null;

  return (
    <header className="navbar">
      <div className="navbar-left">📝 My To-Do App</div>
      {showLogout && (
        <div className="navbar-right">
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/');
            }}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const location = useLocation();
  const showFooter = location.pathname === '/home';

  if (!showFooter) return null;

  return (
    <footer className="footer">
      <p>© 2025 My To Do App. All rights reserved.</p>
    </footer>
  );
}

function AppContent() {
  return (
    <>
      <Header />
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<TodoApp />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
