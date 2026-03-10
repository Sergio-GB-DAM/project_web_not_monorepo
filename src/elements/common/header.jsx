import Title from "./title.jsx";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();

    return (
        <div id="wholeHeader">
            <Title titleId="webName" label="webName" />

            {!location.pathname.startsWith("/product/") && !location.pathname.startsWith("/restaurant/") && (

                <header className="d-flex justify-content-center py-3">

                    <ul className="nav nav-pills gap-2">
                        <li className="nav-item"><NavLink to="/" end className="nav-link">Productos</NavLink></li>
                        <li className="nav-item"><NavLink to="/restaurants" className="nav-link">Restaurantes</NavLink></li>
                    </ul>

                </header>
            )}
        </div>
    );
};


export default Header;