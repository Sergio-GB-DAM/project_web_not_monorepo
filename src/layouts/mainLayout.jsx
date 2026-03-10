import { Outlet } from "react-router-dom";
import Header from "../elements/common/header.jsx";
import Footer from "../elements/common/footer.jsx";
import FloatingButton from "../elements/floatingButton.jsx";

const MainLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
                <FloatingButton />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
