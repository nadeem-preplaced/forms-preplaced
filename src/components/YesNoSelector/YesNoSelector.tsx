import Spacer from "../Spacer/Spacer";
import { ErrorMessage } from "@hookform/error-message";
import QuestionBox from "../QuestionBox/QuestionBox";
interface YesNoSelectorProps {
  id: any;
  question: any;
  showInReport?: any;
  required: any;
  register: any;
  errors: any;
  hide?:any;
}
const YesNoSelector = ({
  id,
  question,
  showInReport,
  required,
  register,
  errors,
  hide
}: YesNoSelectorProps) => {
  const idYes = id + "Yes";
  const idNo = id + "No";

  const yesNoId = "yesNo_" + id;

  return (
    <div className={`${hide && 'hidden'}`}>
      <Spacer className="mb-4" />
      <QuestionBox question={question} required={required}/>
      <Spacer className="mb-4" />
      <ul className="grid grid-cols-3 gap-x-5 max-w-md">
        <li className="relative">
          <input
            className="sr-only peer"
            type="radio"
            value={"Yes"}
            id={idYes}
            {...register(yesNoId, {
              required: required ? "Please Select Yes or No" : false,
            })}
          />
          <label
            className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent"
            htmlFor={idYes}
          >
            Yes
          </label>

          <div className="absolute hidden w-5 h-5 peer-checked:block top-5 right-3">
            👍
          </div>
        </li>

        <li className="relative">
          <input
            className="sr-only peer"
            type="radio"
            value={"No"}
            id={idNo}
            {...register(yesNoId, {
              required: required ? "Please Select Yes or No" : false,
            })}
          />
          <label
            className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-red-500 peer-checked:ring-2 peer-checked:border-transparent"
            htmlFor={idNo}
          >
            No
          </label>

          <div className="absolute hidden w-5 h-5 peer-checked:block top-5 right-3">
            👎
          </div>
        </li>
      </ul>
      <Spacer className="mb-1" />
      <ErrorMessage
        errors={errors}
        name={yesNoId}
        render={({ message }) => (
          <p className="mt-2 text-sm text-red-500">{message}</p>
        )}
      />
    </div>
  );
};

export default YesNoSelector;
