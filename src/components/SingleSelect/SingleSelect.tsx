import { Controller } from "react-hook-form";
import Spacer from "../Spacer/Spacer";
import ReactSelect from "react-select";
import Select from "react-select";
import QuestionBox from "../QuestionBox/QuestionBox";

interface SingleSelectProps {
  control: any;
  question:string;
  id:any;
  options:any;
  required:boolean;
  hide?:boolean;
}
const SingleSelect = ({question, id, options, required, control, hide }: SingleSelectProps) => {
  const error = 'Please Select'
  const optionForSelect:any = []

  options.map((item:any)=>{
    return optionForSelect.push({value:item,label:item})
  })

  const singleSelectId  = 'singleSelect_' + id;
  return (
    <div className={`${hide && "hidden"}`}>
      <Spacer className="mb-4" />
      <QuestionBox question={question} required={required}/>
      <Spacer className="mb-4" />
      <Controller
        name={singleSelectId}
        control={control}
        rules={{ required: required }}
        render={({ field, fieldState }) => (
          <>
            <Select
              value={field.value}
              onChange={field.onChange}
              ref={field.ref}
              options={optionForSelect}
              isClearable
            />
            {fieldState.error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default SingleSelect;
