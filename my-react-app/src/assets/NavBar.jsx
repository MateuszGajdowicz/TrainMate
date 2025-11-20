import './NavBar.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function NavBar({LogOut}){
    return(
        <nav>
            <ul>
                <li id="logo"><Link className='link' to="/mainPanel">TrainMate</Link></li>
                <li><Link className='link' to='/mainPanel'>STRONA GŁÓWNA</Link></li>
                <li><Link className='link' to='/activitiesPanel'>AKTYWNOŚCI</Link></li>
                <li><Link className='link' to='/challengesPanel'>WYZWANIA</Link></li>
                <li><Link className='link' to='/trainingsPanel'>TRENINGI</Link></li>
                <li><Link className='link' to='/planPanel'>PLANY</Link></li>
                <li><Link className='link' to='/chartsPanel'>WYKRESY</Link></li>
                <li><Link className='link' to='/rankingPanel'>RANKING</Link></li>
                <li><Link className='Link' to='/userProfilePanel'>PROFIL</Link></li>
                <li><Link className='Link' to='/'  onClick={LogOut}>WYLOGUJ</Link></li>
            </ul>


        </nav>
    )
}
export default NavBar