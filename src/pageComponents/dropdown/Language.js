import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import us from "../../assets/img/flags/us.png"
import fr from "../../assets/img/flags/fr.png";
import es from "../../assets/img/flags/es.png";
import de from "../../assets/img/flags/de.png";
import { Link } from 'react-router-dom';
const LanguageDropdown = ({...props}) => {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((dropdown) => !dropdown);
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          
            const data = [
                { id: 1, name: 'English', flag: us},
                { id: 2, name: 'French', flag: fr},
                { id: 3, name: 'Spanish', flag: es },
                { id: 4, name: 'German', flag: de }
            ];
      setLanguages(data);
        };

        fetchData();
    }, []);

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        setOpen(false);
    };

    return (
        <>
          <Dropdown 
             tag="li"
           toggle={toggle}
           isOpen={open}
          className="nav-item dropdown has-arrow flag-nav">
            <DropdownToggle 
            onClick={(e) => e.preventDefault()}
            className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button">
                <img src={us} alt="Flag" height="20" />
                 <span >
                    {selectedLanguage ? selectedLanguage.name : 'English'}
                 </span>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu dropdown-menu-right">
              {languages.map(language => (
                    <Link key={language.id} href="#" className="dropdown-item" 
                    onClick={() => handleLanguageSelect(language)}>
                        <img src={language.flag} alt="Flag" height="16" /> {language.name}
                    </Link>
                ))}
            </DropdownMenu>
        </Dropdown>
        </>
    );
};

export default LanguageDropdown;
