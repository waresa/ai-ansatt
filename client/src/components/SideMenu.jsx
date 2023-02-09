import React from 'react';

const SideMenu = (props) => {
    const { ansatt, generator, clearChat, setAnsatt, setGenerator } = props;

    function toggleInfoOn() {
        const info = document.querySelector('.info');
        info.style.display = 'flex';
      }
      
  
    return (
      <aside className='sidemenu'>
        <div className='sidemenu-btn' onClick={() => {clearChat(); toggleInfoOn();}}>
          <span>+</span>
          Ny Samtale
        </div>
        <select className='sidemenu-select' value={ansatt} onChange={(e) => {setAnsatt(e.target.value); setGenerator(''); clearChat(); toggleInfoOn();}}>
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
  
        <select className='sidemenu-select' value={generator} onChange={(e) => {setGenerator(e.target.value); setAnsatt(''); clearChat(); toggleInfoOn();}}>
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
  
      </aside>
    );
  }
  

export default SideMenu;