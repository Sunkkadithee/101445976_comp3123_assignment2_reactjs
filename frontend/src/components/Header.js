import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username') || 'Guest';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className="header-container" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f5f5f5' }}>
      <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>My App</h1>
      <div>
        {token ? (
          <div>
            <span>Hello, {username}</span>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
              Logout
            </button>
          </div>
        ) : (
          // Removed Login button here
          null
        )}
      </div>
    </div>
  );
};

export default Header;
