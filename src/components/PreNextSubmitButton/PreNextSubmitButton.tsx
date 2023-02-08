import { useDispatch, useSelector } from "react-redux";
import { downgradeCurrentPage } from "../../redux/formDataReducer/formDataReducer";

const PreNextSubmitButton = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.formData);
  const handleClickBack = () => {
    dispatch(downgradeCurrentPage());
  };
  return (
    <>
      <div className="mb-2 max-w-screen-sm m-auto px-2 w-full">
        {state.currentPage !== 0 && (
          <button
            type="button"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2 sm:mr-4"
            onClick={handleClickBack}
          >
            ← Back
          </button>
        )}
        <button
          type="submit"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {state.currentPage !== state.totalPage ? "Next! →" : "Submit"}
        </button>
      </div>
    </>
  );
};

export default PreNextSubmitButton;
