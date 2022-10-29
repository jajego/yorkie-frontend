import React from "react";

const Header = () => (
  <div className="header">
    <div className="header-left">
      <h3 className="header-logo">yorkie</h3>
    </div>
    <div className="header-right">
      <div className="loading-train">🚂</div>
      <p className="header-text" id="header-text">
        Updates every minute!
      </p>
    </div>
    {/* {{if (user){
            <button onClick={handleLogout}>Log out</button>
        }}}  */}
  </div>
);

export default Header;
