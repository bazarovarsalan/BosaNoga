import { ICatalogItem } from "../../redux/store/catalogCategoriesSlice";
import { useEffect, useState } from "react";
import "../../App.css";
import NavButton from "./NavButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCatalogItems } from "../../redux/catalogItemsSlice";
import Items from "./Items";
import { fetchCatalogCategories } from "../../redux/store/catalogCategoriesSlice";
import Loading from "../Loading";

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};

const CatalogComponent = () => {
  const catalogCategoriesFromServer = useAppSelector(
    (state) => state.catalogCategories
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCatalogCategories());
  }, [dispatch]);
  //download categories of catalog

  const catalogCategoriesAll = [
    { id: "All", title: "Все" },
    ...catalogCategoriesFromServer.categories,
  ];
  //create "All" category

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
    dispatch(fetchCatalogItems({ get: { status: true, id: "All" } }));
  }, [dispatch]);

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
        {catalogCategoriesAll.map((o) => {
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
      <div className="row">
        {categoryItems.status === "loading" ? (
          <Loading />
        ) : (
          categoryItems.items &&
          categoryItems.items.map((o) => {
            return (
              <Items
                image={o.images[0]}
                title={o.title}
                price={o.price.toString()}
                id={o.id.toString()}
                key={o.id}
              />
            );
          })
        )}
      </div>
      {categoryItems.items.length >= 6 && (
        <div className="text-center">
          <button
            className="btn btn-outline-primary"
            onClick={handlerOffset}
            disabled={categoryItems.status === "loading"}
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </>
  );
};

export default CatalogComponent;
