import { ICatalogItem } from "../../redux/catalogCategoriesSlice";
import { useEffect, useState } from "react";
import "../../App.css";
import NavButton from "./NavButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCatalogItems } from "../../redux/catalogItemsSlice";
import Items from "./Items";
import { fetchCatalogCategories } from "../../redux/catalogCategoriesSlice";
import Loading from "../Loading";
import ErrorComponent from "../ErrorComponent";

const CatalogComponent = () => {
  const catalogCategoriesFromServer = useAppSelector(
    (state) => state.catalogCategories
  );
  const dispatch = useAppDispatch();
  const displayInputedSearch = useAppSelector(
    (state) => state.inputSearch.inputSearch.displaySearchingItem
  );

  useEffect(() => {
    dispatch(fetchCatalogCategories());
  }, [dispatch]);
  //download categories of catalog

  const catalogCategoriesAll = [
    { id: "All", title: "Все" },
    ...catalogCategoriesFromServer.categories,
  ];
  //create "All" category if catalog categories has downloaded

  const [selectedCategory, setSelectedCategory] = useState<ICatalogItem>(
    catalogCategoriesAll[0]
  );
  // default chosen category "Все";

  const handleClickSelect = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { id, innerText } = event.target as HTMLElement;
    setSelectedCategory({ id, title: innerText });
    setQuontityToPassOffset(6);
  };

  const categoryItems = useAppSelector((state) => state.catalogItems);
  //take catalog items despite of category

  useEffect(() => {
    if (displayInputedSearch !== "") return;
    dispatch(fetchCatalogItems({ get: { status: true, id: "All" } }));
  }, [dispatch, displayInputedSearch]);

  const [quontityToPassOffset, setQuontityToPassOffset] = useState<number>(6);
  //create variable for get request offset items

  const handlerOffset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(
      fetchCatalogItems({
        offset: {
          status: true,
          id: selectedCategory.id?.toString(),
          quontityToOffset: quontityToPassOffset,
        },
      })
    );
    setQuontityToPassOffset((prev) => prev + 6);
  };

  return (
    <>
      <ul className="catalog-categories nav justify-content-center">
        {catalogCategoriesFromServer.status === "rejected" && (
          <ErrorComponent
            repeatSubmit={() => {
              dispatch(fetchCatalogCategories());
            }}
          />
        )}
        {catalogCategoriesFromServer.status === "resolved" &&
          catalogCategoriesFromServer.categories &&
          catalogCategoriesAll.map((o) => {
            return (
              <NavButton
                key={o.id}
                elem={o}
                handleClickSelect={handleClickSelect}
                selectedCategory={selectedCategory}
              />
            );
          })}
      </ul>
      {categoryItems.status === "loading" && <Loading />}
      {catalogCategoriesFromServer.status === "resolved" &&
        categoryItems.items && (
          <div className="row gy-3">
            {categoryItems.items.map((o) => {
              return (
                <Items
                  image={o.images[0]}
                  title={o.title}
                  price={o.price.toString()}
                  id={o.id.toString()}
                  key={o.id}
                />
              );
            })}
          </div>
        )}
      {categoryItems.status === "rejected" && !categoryItems.items && (
        <ErrorComponent
          repeatSubmit={() => {
            dispatch(
              fetchCatalogItems({
                get: { status: true, id: "All" },
              })
            );
          }}
        />
      )}
      {categoryItems.status === "resolved" && !categoryItems.items.length && (
        <div className="row gy-3">
          <div
            className="card w-120 text-center"
            style={{ marginTop: "100px" }}
          >
            <div className="card-body">В данной категории нет товаров.</div>
          </div>
        </div>
      )}
      {categoryItems.status === "resolved" &&
        categoryItems.items.length >= 6 && (
          <div className="text-center">
            <button className="btn btn-outline-primary" onClick={handlerOffset}>
              Загрузить ещё
            </button>
          </div>
        )}
    </>
  );
};

export default CatalogComponent;
