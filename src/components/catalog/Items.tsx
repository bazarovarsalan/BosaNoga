import "../../App.css";
import { useNavigate } from "react-router";

interface ItemsProps {
  image: string;
  title: string;
  price: string;
  id: string;
}

const Items = ({ image, title, price, id }: ItemsProps) => {
  const navigate = useNavigate();

  const handlerClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(`/catalog/:${id}`);
  };

  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <div className="img-container">
          <img className="card-img-top" src={image}></img>
        </div>
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-text">{price} руб.</p>
          <a
            href="#/"
            className="btn btn-outline-primary"
            onClick={handlerClick}
          >
            Заказать
          </a>
        </div>
      </div>
    </div>
  );
};

export default Items;
