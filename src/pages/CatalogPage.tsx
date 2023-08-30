import "../App.css";
import banner from "../../assets/banner.jpg";
import CatalogComponent from "../components/catalog/CatalogComponent";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { addValueInput } from "../redux/inputSearchSlice";
import { useEffect } from "react";

const CatalogPage = () => {
  const inputSearchValue = useAppSelector(
    (state) => state.inputSearch.inputSearch.value
  );
  const dispatch = useAppDispatch();

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
