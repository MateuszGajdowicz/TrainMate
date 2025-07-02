import './NavBar.css'
function NavBar({LogOut}){
    return(
        <nav>
            <ul>
                <li id="logo">TrainMate</li>
                <li>STRONA GŁÓWNA</li>
                <li>AKTYWNOŚCI</li>
                <li>WYZWANIA</li>
                <li>TRENINGI</li>
                <li>PLANY</li>
                <li>PROFIL</li>
                <li onClick={()=>LogOut()}>WYLOGUJ</li>
            </ul>

        </nav>
    )
}
export default NavBar