import banner from "../../../assets/banner.jpg";
import "../../App.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeFromCart } from "../../redux/store/cartAddedItemsSlice";
import {
  addInputAdressForOrder,
  addInputPhoneForOrder,
} from "../../redux/store/placeTheOrderSlice";
import { useEffect, useState } from "react";
import { fetchPostOrder } from "../../redux/store/placeTheOrderSlice";
import { clearCart } from "../../redux/store/cartAddedItemsSlice";
import { clearState } from "../../redux/store/placeTheOrderSlice";
import ErrorComponent from "../ErrorComponent";
import Loading from "../Loading";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartList = useAppSelector((state) => state.cartAddedItems.cartList);
  const resultAmountPrices = cartList.reduce(
    (acc, cur) => acc + cur.price * cur.quontity,
    0
  );
  const status = useAppSelector((state) => state.placeTheOrder.status);
  const inputOfOwner = useAppSelector(
    (state) => state.placeTheOrder.inputForOrder
  );
  const [agreement, setAgreement] = useState<boolean>(false);

  const items = cartList.map((o) => {
    return { id: o.id, price: o.price * o.quontity, count: o.quontity };
  });

  const [validPhone, setValidPhone] = useState<boolean | null>(null);

  const onChangeHandlerPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    dispatch(addInputPhoneForOrder(value));
  };

  useEffect(() => {
    if (inputOfOwner.phone === "") {
      setValidPhone(null);
      return;
    }
    const re: RegExp = /^((\+7|7|8)+([0-9]){10})$/; // validation of phone number input
    if (!re.test(inputOfOwner.phone)) {
      setValidPhone(true);
      return;
    } else {
      setValidPhone(false);
    }
  }, [inputOfOwner.phone]);

  const onChangeHandlerAdress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const { value } = event.target;
    dispatch(addInputAdressForOrder(value));
  };

  const agreementFoo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreement(event.target.checked);
  };

  const sendOrderSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(fetchPostOrder({ owner: inputOfOwner, items }));
  };

  useEffect(() => {
    setTimeout(() => {
      if (status === "resolved") {
        dispatch(clearCart());
        dispatch(clearState());
      }
    }, 5000);
  }, [dispatch, status]);

  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <div className="banner">
              <img src={banner} className="img-fluid" alt="К весне готовы!" />
              <h2 className="banner-header">К весне готовы!</h2>
            </div>
            {cartList.length > 0 ? (
              <section className="cart">
                <h2 className="text-center">Корзина</h2>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Название</th>
                      <th scope="col">Размер</th>
                      <th scope="col">Кол-во</th>
                      <th scope="col">Стоимость</th>
                      <th scope="col">Итого</th>
                      <th scope="col">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartList.map((o, index) => {
                      return (
                        <tr key={o.id}>
                          <td scope="row">1</td>
                          <td>
                            <a href={`/catalog/:${o.id}`}>{o.title}</a>
                          </td>
                          <td>{o.size}</td>
                          <td>{index + 1}</td>
                          <td>{o.price}</td>
                          <td>{o.price * o.quontity}</td>
                          <td>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={(event) => {
                                event.preventDefault();
                                dispatch(removeFromCart(o.id));
                              }}
                            >
                              Удалить
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td colSpan={5} className="text-right">
                        Общая стоимость
                      </td>
                      <td>{resultAmountPrices}</td>
                    </tr>
                  </tbody>
                </table>
              </section>
            ) : (
              <div
                style={{
                  justifyContent: "center",
                  fontSize: "30px",
                  textAlign: "center",
                  marginTop: "30px",
                }}
              >
                {" "}
                В корзине нет товаров
              </div>
            )}
            {cartList.length > 0 && (
              <section className="order">
                <h2 className="text-center">Оформить заказ</h2>
                <div className="cardCart">
                  <form className="card-body">
                    <div className="form-group">
                      <label>Телефон</label>
                      {validPhone && (
                        <div style={{ color: "red" }}>
                          Номер телефона введен в неверном формате
                        </div>
                      )}
                      <input
                        className="form-control"
                        id="phone"
                        placeholder="Ваш телефон"
                        autoComplete="off"
                        value={inputOfOwner.phone}
                        onChange={onChangeHandlerPhone}
                      />
                    </div>
                    <div className="form-group">
                      <label>Адрес доставки</label>
                      <input
                        className="form-control"
                        id="address"
                        autoComplete="off"
                        placeholder="Адрес доставки"
                        value={inputOfOwner.adress}
                        onChange={onChangeHandlerAdress}
                      />
                    </div>
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="agreement"
                        onChange={agreementFoo}
                      />
                      <label className="form-check-label">
                        Согласен с правилами доставки
                      </label>
                    </div>
                    {status === "rejected" ? (
                      <ErrorComponent repeatSubmit={sendOrderSubmit} />
                    ) : status === "loading" ? (
                      <Loading />
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-outline-secondary"
                        disabled={!agreement}
                        onClick={sendOrderSubmit}
                      >
                        Оформить
                      </button>
                    )}
                    {status === "resolved" && (
                      <div
                        className="alert alert-success d-flex justify-content-center"
                        role="alert"
                      >
                        Сообщение об успехе. Ваш товар оформлен! Поздравляем с
                        покупкой!
                      </div>
                    )}
                  </form>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Cart;
