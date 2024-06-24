import './navbar.scss'
import { Link } from 'react-router-dom'
import { Menu, LightMode, DarkMode } from '@mui/icons-material'
import { ToggleButton } from '@mui/material'
import { useContext, useState } from 'react'
import { ThemeContext } from '../context/theme.context'

const links = [
    { href: "/", label: "Home" },
    { href: "/buildings", label: "Buildings" },
    { href: "/grades", label: "Grades" },
    { href: "/students", label: "Students" },
    { href: "/classes", label: "Classes" }
]

const Navbar = () => {
    const [open, setOpen] = useState<boolean>(false)
    const { darkMode, toggleDarkMode } = useContext(ThemeContext)
    const toggleOpenMenu = () => {setOpen((prevState) => !prevState)}

    const menuStyles = open ? "menu open" : "menu"

    //TODO Change brand class to logo or acronym.

    return (
        <div className="navbar">
            <div className="brand">
                <span>Student Records System</span>
            </div>
            <div className={ menuStyles }>
                <ul>
                    {links.map((link, index) => (
                        <li key={index} onClick={toggleOpenMenu}>
                            <Link to={link.href}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="hamburger">
                <Menu onClick={toggleOpenMenu} />
            </div>
            <div className="toggle">
                <ToggleButton value={"check"} selected={darkMode} onChange={toggleDarkMode}>
                    {darkMode ? <LightMode /> : <DarkMode />}
                </ToggleButton>
            </div>
        </div>
    )
}

export default Navbar;