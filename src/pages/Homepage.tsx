import { useEffect } from "react";
import banner from "../../assets/banner.jpg";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchTopSales } from "../redux/topSalesSlice";
import "../App.css";
import CatalogComponent from "../components/catalog/CatalogComponent";
import Items from "../components/catalog/Items";
import Loading from "../components/Loading";
import ErrorComponent from "../components/ErrorComponent";

const Homepage = () => {
  const dispatch = useAppDispatch();
  const topSaleItems = useAppSelector((state) => state.topSales.topItems);
  const status = useAppSelector((state) => state.catalogItems.status);

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
              {status === "loading" && <Loading />}
              {status === "resolved" && topSaleItems && (
                <div className="row">
                  {topSaleItems.map((o) => {
                    return (
                      <Items
                        image={o.images[0]}
                        title={o.title}
                        price={o.price}
                        id={o.id}
                        key={o.id}
                      />
                    );
                  })}
                </div>
              )}
              {status === "rejected" && (
                <ErrorComponent
                  repeatSubmit={() => {
                    dispatch(fetchTopSales());
                  }}
                />
              )}
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
