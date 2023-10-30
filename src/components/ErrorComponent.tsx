interface IErrorState {
  repeatSubmit: (event: React.FormEvent<HTMLButtonElement>) => void;
}

const ErrorComponent = ({ repeatSubmit }: IErrorState) => {
  return (
    <div
      className="w-100 fs-6 alert alert-danger d-flex justify-content-center align-items-center"
      role="alert"
    >
      Произошла ошибка!
      <button className="btn btn-danger btn-sm ml-3" onClick={repeatSubmit}>
        Повторить
      </button>
    </div>
  );
};

export default ErrorComponent;
