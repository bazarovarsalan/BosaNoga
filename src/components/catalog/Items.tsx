import { CatalogItem } from "../../redux/catalogItemsSlice";
import "../../App.css";

interface ItemsProps {
  item: CatalogItem;
}

const Items = ({ item }: ItemsProps) => {
  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <img
          src={item.images[0]}
          className="card-img-top img-fluid"
          alt={item.title}
        />
        <div className="card-body">
          <p className="card-text">{item.title}</p>
          <p className="card-text">{item.price} руб.</p>
          <a href="/products/1.html" className="btn btn-outline-primary">
            Заказать
          </a>
        </div>
      </div>
    </div>
  );
};

export default Items;
