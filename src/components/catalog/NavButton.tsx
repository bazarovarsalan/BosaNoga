import classNames from "classnames";
import { ICatalogItem } from "../../redux/catalogCategoriesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCatalogItems } from "../../redux/catalogItemsSlice";
import { addValueInput } from "../../redux/inputSearchSlice";
import { changeToggleInput } from "../../redux/inputSearchSlice";

interface PropsNavBtn {
  elem: ICatalogItem;
  handleClickSelect: (e: React.SyntheticEvent) => void;
  selectedCategory: ICatalogItem;
}

const NavButton = ({
  elem,
  handleClickSelect,
  selectedCategory,
}: PropsNavBtn) => {
  const dispatch = useAppDispatch();

  const searchingVal = useAppSelector(
    (state) => state.inputSearch.inputSearch.displaySearchingItem
  );

  const handleChangeCategory = (event: React.SyntheticEvent) => {
    handleClickSelect(event);
    dispatch(addValueInput(""));
    dispatch(changeToggleInput());
    if (searchingVal === "") {
      dispatch(
        fetchCatalogItems({ get: { status: true, id: elem.id.toString() } })
      );
    } else {
      dispatch(
        fetchCatalogItems({
          search: { status: true, value: searchingVal, id: elem.id.toString() },
        })
      );
    }
  };

  return (
    <>
      <li className="nav-item">
        <a
          href="#"
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
