import { Controller } from "react-hook-form";
import QuestionBox from "../QuestionBox/QuestionBox";
import Spacer from "../Spacer/Spacer";

interface ShortTextProps {
  control: any;
  question:string;
  id:any;
  options:any;
  required:boolean;
  placeholder:string;
  hide?:boolean;
}

const ShortText = ({question, id, options, required, control, placeholder,hide }: ShortTextProps) => {
  const error = 'Please Fill';
  const shortTextId = 'shortText_' + id;
  return (
    <div className={`${hide && 'hidden'}`}>
      <Spacer className="mb-4" />
      <QuestionBox question={question} required={required}/>
      <Spacer className="mb-4" />
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <Controller
          name={shortTextId as never}
          control={control}
          rules={{ required: required }}
          render={ ({ field,fieldState }) => (
            <>
              <input
                type="text"
                value={field.value || ''}
                onChange={field.onChange}
                ref={field.ref}
                placeholder={placeholder}
                className={`block w-3/6 shadow-sm sm:text-sm border-gray-300 rounded-md ${fieldState.error && 'focus:ring-red-500 focus:border-red-500'}`}
              />
              {fieldState.error && <p className="mt-2 text-sm text-red-500">
            {error}
          </p>}
            </>
  )}
        />
      </div>
    </div>
  );
};

export default ShortText;
