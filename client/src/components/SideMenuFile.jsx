import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import { useState } from 'react';


const SideMenuFile = (props) => {
    const { clearChat, } = props;
    const [file, setFile] = useState(null);

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

    function onFileChange(e) {
        setFile(e.target.files[0]);
    }

    function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
    }
  
    return (
    <div className='sidemenu-container'>
    <div className='nav'><Hamburger onToggle={showNavbar} color='#fff' size={20} /></div>
      <aside className='sidemenu'>
        <div className='sidemenu-btn' onClick={() => {clearChat(); toggleInfoOn();}}>
          <span>+</span>
          Ny Samtale
        </div>
        <form action="#" method='post' onSubmit={onSubmit}>
            <div className='form-group files'>
                <label >Las opp filen her...</label>
                <input type="file" className='form-control' onChange={onFileChange}/>
            </div>
        </form>
        <hr className="sidemenu-hr"/>

        <Link to="/home" className='link'>
            <div className="sidemenu-bottom-btn">
                Hjem
            </div>
        </Link>
        <Link to="/" className='link'>
            <div className="sidemenu-bottom-btn">
                Chat
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
  

export default SideMenuFile;