import "../App.css";
import banner from "../../assets/banner.jpg";
import CatalogComponent from "../components/catalog/CatalogComponent";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { addValueInput } from "../redux/inputSearchSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { fetchCatalogItems } from "../redux/catalogItemsSlice";
import { changeToggleInput } from "../redux/inputSearchSlice";

const CatalogPage = () => {
  const inputSearchValue = useAppSelector(
    (state) => state.inputSearch.inputSearch.value
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(addValueInput(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(addValueInput(""));
  }, [dispatch]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    dispatch(addValueInput(value));
  };

  const searchKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    if (inputSearchValue == "") {
      dispatch(changeToggleInput());
      return;
    }
    navigate("/catalog");
    setTimeout(() => {
      dispatch(
        fetchCatalogItems({ search: { status: true, value: inputSearchValue } })
      );
    }, 100);
    // this SetTimeout func is used because when you go to the "/catalog" page,
    //useEffect sends a "get" request to take all product categories and overwrites
    //the data received by the request "search"
  };

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
                <input
                  className="form-control"
                  placeholder="Поиск"
                  onChange={onChangeHandler}
                  value={inputSearchValue}
                  onKeyDown={searchKeyDownHandler}
                />
              </form>
              {<CatalogComponent />}
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default CatalogPage;
