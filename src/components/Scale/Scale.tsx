import Spacer from "../Spacer/Spacer";
import { ErrorMessage } from "@hookform/error-message";
import QuestionBox from "../QuestionBox/QuestionBox";

interface ScaleProps {
  id: any;
  question: any;
  showInReport?: any;
  required: any;
  register: any;
  scale: number;
  errors: any;
  startingLabel: string;
  endingLabel: string;
  hide?:boolean;
}

const Scale = ({
  id,
  question,
  showInReport,
  required,
  register,
  scale,
  errors,
  startingLabel,
  endingLabel,
  hide
}: ScaleProps) => {

  const supportTextClassName = "text-[10px] text-gray-700 uppercase font-bold";

  const scaleId = "scale_" + id;
  return (
    <div className={`${hide && 'hidden'}`}>
      <Spacer className="mb-4" />
      <QuestionBox question={question} required={required}/>
      <Spacer className="mb-4" />
      <div className="inline-flex flex-col">
        <ul 
        className="flex flex-row gap-1 flex-wrap"
        // className="flex flex-row"
        >
          {scale &&
            [...Array(scale)].map((scaleValue: any, index: any) => {
              return (
                <li className="relative">
                  <input
                    className="sr-only peer"
                    type="radio"
                    value={index}
                    id={id + "_" + index}
                    {...register(scaleId, {
                      required: required
                        ? "Please mark atleast one checkbox"
                        : false,
                    })}
                  />
                  <label
                    className={`rounded-lg flex p-2 px-4 bg-white border border-gray-300 cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent`}
                    // className={`${index===0 ? 'rounded-l-lg' : index===scale-1 ? 'rounded-r-lg' : ''} flex p-2 px-4 bg-white border border-gray-300 cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent`}
                    htmlFor={id + "_" + index}
                  >
                    {index}
                  </label>
                </li>
              );
            })}
        </ul>
        <div className="flex flex-row justify-between mt-1">
          <div className={supportTextClassName}>{startingLabel}</div>
          <div className={supportTextClassName}>{endingLabel}</div>
        </div>
      </div>
      <Spacer className="mb-1" />
      <ErrorMessage
        errors={errors}
        name={scaleId}
        render={({ message }) => (
          <p className="mt-2 text-sm text-red-500">{message}</p>
        )}
      />
    </div>
  );
};

export default Scale;
