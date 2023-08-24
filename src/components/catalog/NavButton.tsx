import classNames from "classnames";
import { ICatalogItem } from "../../redux/store/catalogCategoriesSlice";
import { useAppDispatch } from "../../redux/hooks";
import { fetchCatalogItems } from "../../redux/catalogItemsSlice";
import { addValueInput } from "../../redux/store/inputSearchSlice";

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

  const handleChangeCategory = (event: React.SyntheticEvent) => {
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
