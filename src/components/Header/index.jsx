import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        🤖 <span className="app-name">AIChat</span>
      </div>

      <div className="header-right">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default Header;
