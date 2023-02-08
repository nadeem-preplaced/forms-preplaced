import Spacer from "../Spacer/Spacer";
import { Controller } from "react-hook-form";
import QuestionBox from "../QuestionBox/QuestionBox";

interface LongTextProps {
  control: any;
  question:string;
  id:any;
  options:any;
  required:boolean;
  placeholder:string;
  hide?:boolean;
}

const LongText = ( {question, id, options, required, control, placeholder, hide }: LongTextProps) => {
  const error = 'Please Fill';
  const longTextId = "longText_" + id;
  return (
    <div className={`${hide && 'hidden'}`}>
      <Spacer className="mb-4" />
      <QuestionBox question={question} required={required}/>
      <Spacer className="mb-4" />
      <div className="mt-1 sm:mt-0 sm:col-span-2">
      <Controller
          name={longTextId as never}
          control={control}
          rules={{ required: required }}
          render={({ field, fieldState }) => (
            <>
              <textarea
                rows={3}
                ref={field.ref}
                value={field.value || ""}
                onChange={field.onChange}
                placeholder={placeholder}
                className={`shadow-sm w-3/6 sm:text-sm border border-gray-300 rounded-md ${
                  fieldState.error && "focus:ring-red-500 focus:border-red-500"
                }`}
              />
              {fieldState.error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
};

export default LongText;
