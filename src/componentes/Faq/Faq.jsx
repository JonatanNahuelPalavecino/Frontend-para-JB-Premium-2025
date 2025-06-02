import React, { useEffect, useState } from 'react';
import { dropdowns } from "../utils/datos/preguntas-frecuentes"
import "./Faq.scss"

export const Faq = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    document.title = "Preguntas Frecuentes - JB Premium - Vinos Españoles - Distribuidor Oficial"
  }, [])

  const splitContentIntoParagraphs = (content) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="dropdown-text">{paragraph}</p>
    ));
  };

  const toggleDropdown = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  return (
      <section className='dropdown'>
        <p className="dropdown-title">PREGUNTAS FRECUENTES</p>
        <hr/>
        <div className='dropdown-container'>
          {dropdowns.map((dropdown) => (
            <div className="dropdown-box" key={dropdown.id}>
              <div className="dropdown-header" onClick={() => toggleDropdown(dropdown.id)}>
                <h3 className='dropdown-question'>{dropdown.title}</h3>
                <span>{openDropdown === dropdown.id ? '▲' : '▼'}</span>
              </div>
              <div className={`dropdown-content ${openDropdown === dropdown.id ? 'show' : ''}`}>
                {splitContentIntoParagraphs(dropdown.content)}
              </div>
            </div>
          ))}
        </div>
      </section>
  );
};
