import { useEffect } from "react";
import banner from "../../../assets/banner.jpg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchTopSales } from "../../redux/store/topSalesSlice";
import "../../App.css";
import CatalogComponent from "../catalog/CatalogComponent";
import Items from "../catalog/Items";
import Loading from "../Loading";

const Homepage = () => {
  const dispatch = useAppDispatch();
  const topSaleItems = useAppSelector((state) => state.topSales.topItems);
  const status = useAppSelector((state) => state.catalogItems.status);
  const error = useAppSelector((state) => state.catalogItems.error);

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
                {status === "loading" ? (
                  <Loading />
                ) : (
                  topSaleItems &&
                  topSaleItems.map((o) => {
                    return (
                      <Items
                        image={o.images[0]}
                        title={o.title}
                        price={o.price}
                        id={o.id}
                        key={o.id}
                      />
                    );
                  })
                )}
                {error && <div>{error}</div>}
              </div>
            </section>
            <section className="catalog">
              <h2 className="text-center">Каталог</h2>
              <CatalogComponent />
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Homepage;
