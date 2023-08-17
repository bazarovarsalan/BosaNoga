import { Link, NavLink } from "react-router-dom";
import headerLogo from "../../../public/assets/header-logo.png";
import "../../App.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { addValueInput } from "../../redux/store/inputSearchSlice";
import { useEffect, useState } from "react";
import { fetchCatalogItems } from "../../redux/catalogItemsSlice";

const Header = () => {
  const [toggleSearchInput, setToggleSearchInput] = useState<boolean>(true);
  const inputValue = useAppSelector(
    (state) => state.inputSearch.inputSearch.value
  );
  useEffect(() => {}, [inputValue, inputValue]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    dispatch(addValueInput(value));
  };

  const searchClickHandler = () => {
    if (inputValue == "") {
      setToggleSearchInput((prev) => !prev);
      return;
    }
    navigate("/catalog");
    dispatch(
      fetchCatalogItems({ search: { status: true, value: inputValue } })
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
                    <div className="header-controls-pic header-controls-cart">
                      <div className="header-controls-cart-full">1</div>
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
                      placeholder="Поиск"
                      onChange={onChangeHandler}
                      value={inputValue}
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
