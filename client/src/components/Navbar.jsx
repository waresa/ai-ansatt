import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';


const SideMenu = (props) => {
    const { ansatt, generator, clearChat, setAnsatt, setGenerator } = props;

    function toggleInfoOn() {
        const info = document.querySelector('.info');
        info.style.display = 'flex';
      }
      
      // function showNavbar that turns the display of the sidemenu on and off
        function showNavbar() {
            const sidemenu = document.querySelector('.sidemenu');
            if (sidemenu.style.display === 'none' || sidemenu.style.display === '') {
            sidemenu.style.display = 'block';
            } else {
            sidemenu.style.display = 'none';
            }
        }
  
    return (
    <div className='sidemenu-container-home'>
    <div className='nav'><Hamburger onToggle={showNavbar} color='#fff' size={20} /></div>
      <aside className='sidemenu'>

        <Link to="/home" className='link'>
            <div className="sidemenu-bottom-btn">
                Hjem
            </div>
        </Link>
        <Link to="/profile" className='link'>
            <div className="sidemenu-bottom-btn">
                Profil
            </div>
        </Link>
        <Link to="/log-out" className='link'>
            <div className="sidemenu-bottom-btn">
                Logg Ut
            </div>
        </Link>
        <Link to="/help" className='link'>
            <div className="sidemenu-bottom-help">
                Hjelp?
            </div>
        </Link>
  
      </aside>
      </div>
    );
  }
  

export default SideMenu;