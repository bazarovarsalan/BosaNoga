import "../../App.css";
import banner from "../../assets/banner.jpg";
import sandals_myer from "../../assets/products/sandals_myer.jpg";
import sandals_keira from "../../assets/products/sandals_keira.jpg";
import superhero_sneakers from "../../assets/products/superhero_sneakers.jpg";
import { NavLink } from "react-router-dom";

const Catalog = () => {
  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <div className="banner">
              <img src={banner} className="img-fluid" alt="К весне готовы!" />
              <h2 className="banner-header">К весне готовы!</h2>
            </div>
            <section className="catalog">
              <h2 className="text-center">Каталог</h2>
              <form className="catalog-search-form form-inline">
                <input className="form-control" placeholder="Поиск" />
              </form>
              <ul className="catalog-categories nav justify-content-center">
                <li className="nav-item">
                  <NavLink className="nav-link" to="#">
                    Все
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Женская обувь
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Мужская обувь
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Обувь унисекс
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Детская обувь
                  </NavLink>
                </li>
              </ul>
              <div className="row">
                <div className="col-4">
                  <div className="card catalog-item-card">
                    <img
                      src={sandals_myer}
                      className="card-img-top img-fluid"
                      alt="Босоножки 'MYER'"
                    />
                    <div className="card-body">
                      <p className="card-text">Босоножки 'MYER'</p>
                      <p className="card-text">34 000 руб.</p>
                      <a
                        href="/products/1.html"
                        className="btn btn-outline-primary"
                      >
                        Заказать
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card catalog-item-card">
                    <img
                      src={sandals_keira}
                      className="card-img-top img-fluid"
                      alt="Босоножки 'Keira'"
                    />
                    <div className="card-body">
                      <p className="card-text">Босоножки 'Keira'</p>
                      <p className="card-text">7 600 руб.</p>
                      <a
                        href="/products/1.html"
                        className="btn btn-outline-primary"
                      >
                        Заказать
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card catalog-item-card">
                    <img
                      src={superhero_sneakers}
                      className="card-img-top img-fluid"
                      alt="Супергеройские кеды"
                    />
                    <div className="card-body">
                      <p className="card-text">Супергеройские кеды</p>
                      <p className="card-text">1 400 руб.</p>
                      <a
                        href="/products/1.html"
                        className="btn btn-outline-primary"
                      >
                        Заказать
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card catalog-item-card">
                    <img
                      src={sandals_myer}
                      className="card-img-top img-fluid"
                      alt="Босоножки 'MYER'"
                    />
                    <div className="card-body">
                      <p className="card-text">Босоножки 'MYER'</p>
                      <p className="card-text">34 000 руб.</p>
                      <a
                        href="/products/1.html"
                        className="btn btn-outline-primary"
                      >
                        Заказать
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card catalog-item-card">
                    <img
                      src={sandals_keira}
                      className="card-img-top img-fluid"
                      alt="Босоножки 'Keira'"
                    />
                    <div className="card-body">
                      <p className="card-text">Босоножки 'Keira'</p>
                      <p className="card-text">7 600 руб.</p>
                      <a
                        href="/products/1.html"
                        className="btn btn-outline-primary"
                      >
                        Заказать
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card catalog-item-card">
                    <img
                      src={superhero_sneakers}
                      className="card-img-top img-fluid"
                      alt="Супергеройские кеды"
                    />
                    <div className="card-body">
                      <p className="card-text">Супергеройские кеды</p>
                      <p className="card-text">1 400 руб.</p>
                      <a
                        href="/products/1.html"
                        className="btn btn-outline-primary"
                      >
                        Заказать
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button className="btn btn-outline-primary">
                  Загрузить ещё
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Catalog;
