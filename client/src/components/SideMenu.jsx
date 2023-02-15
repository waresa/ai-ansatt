import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';


const SideMenu = (props) => {
    const { ansatt, generator, clearChat, setAnsatt, setGenerator, file, setFile } = props;

    function toggleInfoOn() {
        const info = document.querySelector('.info');
        info.style.display = 'flex';
      }

    function unsetFile() {
        setFile(null);
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

     function toggleFileOn () {
         const file = document.querySelector('.files');
         if (file.style.display === 'none' || file.style.display === '') {
            file.style.display = 'block';
            }
     }

      function toggleFileOff () {
        const file = document.querySelector('.files');
        if (file.style.display !== 'none') {
            file.style.display = 'none';
            }
    }

     function toggleSideSelectOn () {
        const sideSelect = document.querySelector('.side-select');
        if (sideSelect.style.display === 'none' || sideSelect.style.display === '') {
           sideSelect.style.display = 'block';
           }
        const file = document.querySelector('.files');
        if (file.style.display !== 'none') {
            file.style.display = 'none';
            }
    }
    function toggleSideSelectOff () {
      const sideSelect = document.querySelector('.side-select');
      if (sideSelect.style.display !== 'none') {
         sideSelect.style.display = 'none';
         unsetAnsattNdGenerator();
         }
  }

    function unsetAnsattNdGenerator() {
        setAnsatt('');
        setGenerator('');
    }
  
    return (
    <div className='sidemenu-container'>
    <div className='nav'><Hamburger onToggle={showNavbar} color='#fff' size={20} /></div>
      <aside className='sidemenu'>
        <div className='sidemenu-top'>
          <div className='sidemenu-btn-ns' onClick={() => {clearChat(); toggleInfoOn(); unsetFile(); toggleSideSelectOff(); toggleFileOff();}}>
            <span>+ </span>
             Ny Samtale
          </div>

          <div className='sidemenu-btn-ag' onClick={() => {clearChat(); toggleInfoOn(); toggleSideSelectOn(); unsetFile(); toggleFileOff();}}>
            Ansatt og Generator
          </div>

          <div className='sidemenu-btn-f' onClick={() => {clearChat(); toggleSideSelectOff(); toggleFileOn(); toggleInfoOn(); }}>
            Jobb med fil
          </div>
        </div>

        <hr className="sidemenu-hr"/>
        <div className='side-select'>
          <select className='sidemenu-select' value={ansatt} onChange={(e) => {setAnsatt(e.target.value); setGenerator(''); clearChat(); toggleInfoOn(); unsetFile();}}>
            <option value=''>Velg ansatt</option>
            <option value='markedssjef'>Markedssjef</option>
            <option value='kundeservice'>Kundeservice</option>
            <option value='seo-spesialist'>SEO Spesialist</option>
            <option value='regnskapsfører'>Regnskapsfører</option>
            <option value='produktansvarlig'>Produktansvarlig</option>
            <option value='salgsansvarlig'>Salgsansvarlig</option>
            <option value='social media expert'>Social Media Expert</option>
            <option value='juridisk rådgiver'>Juridisk Rådgiver</option>
          </select>
    
          <select className='sidemenu-select' value={generator} onChange={(e) => {setGenerator(e.target.value); setAnsatt(''); clearChat(); toggleInfoOn(); unsetFile();}}>
            <option value=''>Velg generator</option>
            <option value='code generator'>Kode Generering</option>
            <option value='content generator'>Content Generering</option>
            <option value='email generator'>Email Generering</option>
            <option value='content spinner'>Innholdsspinning</option>
            <option value='text summarizer'>Tekstsummering</option>
            <option value='text optimizer'>Tekstoptimalisering</option>
            <option value='text simplifier, simplify to a 5th grader level.'>Tekstforenkling</option>
            <option value='resume generator'>CV-generator</option>
            <option value='buisness plan generator'>Forretningsplan Generator</option>
          </select>
        </div>
        {ansatt === "" && generator === "" && 
            <div className='form-group files'>
                <label >Las opp filen her...</label>
                <input type="file" className='form-control' onChange={onFileChange}/>
            </div>
            }
        <hr className="sidemenu-hr"/>

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