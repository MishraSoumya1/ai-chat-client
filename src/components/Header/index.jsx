import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <span className="logo">🤖</span>
        <span className="app-name">AIChat</span>
      </div>
      <div className="header-right">
        {/* Add navigation, theme toggle, user info, etc. here if needed */}
      </div>
    </header>
  );
};

export default Header;
