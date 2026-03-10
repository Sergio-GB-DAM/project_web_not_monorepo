import ProductInfo from "./pages/objectsInfo/productInfo.jsx";
import RestaurantInfo from "./pages/objectsInfo/restaurantInfo.jsx";
import NewProduct from "./pages/newObjects/newProduct.jsx";
import NewRestaurant from "./pages/newObjects/newRestaurant.jsx";
import Login from "./pages/auth/login.jsx";
import SignUp from "./pages/auth/signup.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/mainLayout.jsx";
import CreateLayout from "./layouts/createLayout.jsx";
import AllProducts from "./pages/home/allProducts.jsx";
import AllRestaurants from "./pages/home/allRestaurants.jsx";
import ErrorPage from "./pages/errorPage.jsx";
import { AlertProvider } from "./hooks/useAlert.jsx";

const App = () => {

  return (
    <>
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/error" element={<ErrorPage />} />

            <Route element={<MainLayout />}>
              <Route path="/" element={<AllProducts />}></Route>
              <Route path="/restaurants" element={<AllRestaurants />}></Route>
              <Route path="/product/:id" element={<ProductInfo />}></Route>
              <Route path="/restaurant/:id" element={<RestaurantInfo />}></Route>
            </Route>

            <Route element={<CreateLayout />}>
              <Route path="/new-product" element={<NewProduct />} />
              <Route path="/new-restaurant" element={<NewRestaurant />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </>
  )
}

export default App;
