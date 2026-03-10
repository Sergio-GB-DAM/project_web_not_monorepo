import { Outlet } from "react-router-dom";
import Footer from "../elements/common/footer.jsx";

const CreateLayout = () => {
    return (
        <>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default CreateLayout;