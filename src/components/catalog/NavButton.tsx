import classNames from "classnames";
import { ICatalogItem } from "../../redux/store/catalogCategoriesSlice";
import { HTMLElementEvent } from "./CatalogComponent";
import { useAppDispatch } from "../../redux/hooks";
import { fetchCatalogItems } from "../../redux/catalogItemsSlice";
import { addValueInput } from "../../redux/store/inputSearchSlice";

interface PropsNavBtn {
  elem: ICatalogItem;
  handleClickSelect: (e: HTMLElementEvent<HTMLButtonElement>) => void;
  selectedCategory: ICatalogItem;
}

const NavButton = ({
  elem,
  handleClickSelect,
  selectedCategory,
}: PropsNavBtn) => {
  const dispatch = useAppDispatch();

  const handleChangeCategory = (event: HTMLElementEvent<HTMLButtonElement>) => {
    handleClickSelect(event);
    dispatch(addValueInput(""));
    dispatch(
      fetchCatalogItems({ get: { status: true, id: elem.id.toString() } })
    );
  };

  return (
    <>
      <li className="nav-item">
        <a
          className={classNames("nav-link", {
            active: elem.title === selectedCategory.title,
          })}
          id={elem.id + ""}
          onClick={handleChangeCategory}
        >
          {elem.title}
        </a>
      </li>
    </>
  );
};
export default NavButton;
