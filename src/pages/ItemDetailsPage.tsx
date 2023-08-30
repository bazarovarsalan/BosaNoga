import { useAppDispatch, useAppSelector } from "../redux/hooks";
import banner from "../../assets/banner.jpg";
import { useParams } from "react-router";
import { fetchItemDetails } from "../redux/itemDetailsSlice";
import { useEffect } from "react";
import { useState } from "react";
import classNames from "classnames";
import "../App.css";
import { useNavigate } from "react-router";
import { addToCartItem } from "../redux/cartAddedItemsSlice";

const ItemDetailsPage = () => {
  const item = useAppSelector((state) => state.itemDetails.item);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [quontityOfItem, setQuontityOfItem] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchItemDetails(id?.slice(1)));
  }, [dispatch, id]);

  const increaseFoo = (event: React.MouseEvent) => {
    if (quontityOfItem >= 10) return;
    event.preventDefault();
    setQuontityOfItem((prev) => prev + 1);
  };

  const decreaseFoo = (event: React.MouseEvent) => {
    if (quontityOfItem <= 1) return;
    event.preventDefault();
    setQuontityOfItem((prev) => prev - 1);
  };

  const selectSizeFoo = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { innerText } = event.target as HTMLElement;
    if (selectedSize === innerText) {
      setSelectedSize("");
      return;
    }
    setSelectedSize(innerText);
  };

  const itemForCart = item
    ? {
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.images[0],
        size: selectedSize,
        quontity: quontityOfItem,
      }
    : null;

  const addToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate("/cart");
    itemForCart && dispatch(addToCartItem(itemForCart));
  };

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src={banner} className="img-fluid" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>

          <section className="catalog-item">
            <h2 className="text-center">Босоножки 'MYER'</h2>
            <div className="row">
              <div className="col-5">
                <img
                  src={item?.images[0]}
                  className="img-fluid"
                  alt={item?.title}
                />
              </div>
              <div className="col-7">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>Артикул</td>
                      <td>{item?.sku}</td>
                    </tr>
                    <tr>
                      <td>Производитель</td>
                      <td>{item?.manufactur}</td>
                    </tr>
                    <tr>
                      <td>Цвет</td>
                      <td>{item?.color}</td>
                    </tr>
                    <tr>
                      <td>Материалы</td>
                      <td>{item?.material}</td>
                    </tr>
                    <tr>
                      <td>Сезон</td>
                      <td>{item?.season}</td>
                    </tr>
                    <tr>
                      <td>Повод</td>
                      <td>{item?.reason}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-center">
                  <p>
                    Размеры в наличии:{" "}
                    {item?.sizes.map((o) => {
                      return (
                        o.available && (
                          <span
                            className={classNames("catalog-item-size", {
                              selected: selectedSize === o.size,
                            })}
                            onClick={selectSizeFoo}
                            key={o.size}
                          >
                            {o.size}
                          </span>
                        )
                      );
                    })}
                  </p>
                  {item?.sizes.length !== 0 && (
                    <p>
                      Количество:{" "}
                      <span className="btn-group btn-group-sm pl-2">
                        <button
                          className="btn btn-secondary"
                          onClick={decreaseFoo}
                        >
                          -
                        </button>
                        <span className="btn btn-outline-primary">
                          {quontityOfItem}
                        </span>
                        <button
                          className="btn btn-secondary"
                          onClick={increaseFoo}
                        >
                          +
                        </button>
                      </span>
                    </p>
                  )}
                </div>
                {item?.sizes.length !== 0 && (
                  <button
                    className="btn btn-danger btn-block btn-lg"
                    onClick={addToCart}
                    disabled={selectedSize === ""}
                  >
                    В корзину
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ItemDetailsPage;
