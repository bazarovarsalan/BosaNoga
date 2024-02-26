import { Link, NavLink } from "react-router-dom";
import headerLogo from "../../../assets/header-logo.png";
import "./Header.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { addValueInput } from "../../redux/inputSearchSlice";
import { fetchCatalogItems } from "../../redux/catalogItemsSlice";
import { changeToggleInput } from "../../redux/inputSearchSlice";

const Header = () => {
  const toggleSearchInput = useAppSelector(
    (state) => state.inputSearch.inputSearch.toggleSearchInput
  );
  const inputSearchValue = useAppSelector(
    (state) => state.inputSearch.inputSearch.value
  );
  const cartList = useAppSelector((state) => state.cartAddedItems.cartList);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    dispatch(addValueInput(value));
  };

  const searchClickHandler = () => {
    if (inputSearchValue == "") {
      dispatch(changeToggleInput());
      return;
    }
    navigate("/catalog");
    dispatch(
      fetchCatalogItems({ search: { status: true, value: inputSearchValue } })
    );
    dispatch(changeToggleInput());
  };

  const searchKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    if (inputSearchValue == "") {
      dispatch(changeToggleInput());
      return;
    }
    navigate("/catalog");
    dispatch(
      fetchCatalogItems({ search: { status: true, value: inputSearchValue } })
    );
  };

  return (
    <>
      <header className="header-container">
        <div className="row">
          <div className="col">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <Link className="navbar-brand" to="/">
                <img src={headerLogo} alt="Bosa Noga" />
              </Link>

              <div className="collapase navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      Главная
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/catalog">
                      Каталог
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/about">
                      О магазине
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/contacts">
                      Контакты
                    </NavLink>
                  </li>
                </ul>
                <div>
                  <div className="header-controls-pics">
                    <div
                      data-id="search-expander"
                      className="header-controls-pic header-controls-search"
                      onClick={searchClickHandler}
                    ></div>
                    <div
                      className="header-controls-pic header-controls-cart"
                      onClick={(event) => {
                        if (cartList.length === 0) return;
                        event.preventDefault();
                        navigate("/cart");
                      }}
                    >
                      {cartList.length > 0 && (
                        <div className="header-controls-cart-full">
                          {cartList.length}
                        </div>
                      )}
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </div>
                  <form
                    data-id="search-form"
                    className={classNames(
                      "header-controls-search-form form-inline",
                      { invisible: toggleSearchInput }
                    )}
                  >
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Поиск"
                      onChange={onChangeHandler}
                      value={inputSearchValue}
                      onKeyDown={searchKeyDownHandler}
                    />
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
