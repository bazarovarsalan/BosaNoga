import { useEffect } from "react";
import banner from "../../../public/assets/banner.jpg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchTopSales } from "../../redux/store/topSalesSlice";
import { fetchCatalogCategories } from "../../redux/store/catalogCategoriesSlice";
import "../../App.css";
import { Link } from "react-router-dom";
import CatalogComponent from "../catalog/CatalogComponent";

const Homepage = () => {
  const dispatch = useAppDispatch();
  const topSaleItems = useAppSelector((state) => state.topSales);

  useEffect(() => {
    dispatch(fetchTopSales());
  }, [dispatch]);
  //download list of top sales

  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <div className="banner">
              <img src={banner} className="img-fluid" alt="К весне готовы!" />
              <h2 className="banner-header">К весне готовы!</h2>
            </div>
            <section className="top-sales">
              <h2 className="text-center">Хиты продаж!</h2>
              <div className="row">
                {topSaleItems.status === "loading" ? (
                  <div className="preloader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : (
                  topSaleItems.topItems &&
                  topSaleItems.topItems.map((o) => {
                    return (
                      <div className="col-4" key={o.id}>
                        <div className="card">
                          <img
                            src={o.images[0]}
                            className="card-img-top img-fluid"
                            alt={o.title}
                          />
                          <div className="card-body">
                            <p className="card-text">
                              {o.title.split(" ").length < 3
                                ? o.title
                                : o.title.split(" ").slice(0, 2).join(" ")}
                            </p>
                            <p className="card-text">{o.price} руб.</p>
                            <Link
                              to="/catalog"
                              className="btn btn-outline-primary"
                            >
                              Заказать
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
            <section className="catalog">
              <h2 className="text-center">Каталог</h2>
              {topSaleItems.status === "loading" ? (
                <div className="preloader">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                <CatalogComponent />
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Homepage;
