import './navbar.css';
export default function Navbar({onNewNoteClick, onHowtoClick,onaboutClick}) {
  return (
    <>
      <div className="nav-bar">
        <div className="logo">
          <h1>📜 Notes App Pro</h1>
        </div>
        <div className="menu-btns">
          <ul>
            <li><div className="menu-btn"> <button type='button' id='newnote-btn' onClick={onNewNoteClick}>➕ New Note</button></div></li>
            <li><div className="menu-btn"> <button type='button' id='abut-btn' onClick={onaboutClick}>⚙️About</button></div></li>
            <li><div className="menu-btn"> <button type='button' id='howto-btn' onClick={onHowtoClick}>❓How to</button></div></li>
          </ul>
        </div>
      </div>
    </>
  )
}
