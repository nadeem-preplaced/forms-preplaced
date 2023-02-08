import { stringToCamelCase } from "../../utility/stringToCamelCase";
import Spacer from "../Spacer/Spacer";
import { ErrorMessage } from '@hookform/error-message';
import Rating from "../Rating/Rating";
import {useState,useEffect} from 'react';
import QuestionBox from "../QuestionBox/QuestionBox";
interface CheckBoxProps {
  id: any;
  question: string;
  required: boolean;
  expandOptionsToQuestions: boolean;
  field: string;
  options: any;
  register:any;
  unregister:any;
  errors:any;
  control:any;
  getValues?:any;
  reset?:any;
  setValue?:any;
  hide?:boolean;
}
const CheckBox = ({
  id,
  options,
  question,
  required,
  control,
  expandOptionsToQuestions,
  field,
  register,
  errors,
  getValues,
  reset,
  setValue,
  hide
}: CheckBoxProps) => {
  const [optionsCheckedValues, setOptionsCheckedValues] = useState({})

  const values = getValues();

  const checkboxId = 'checkbox_' + id;
  
  useEffect(() => {
    if(required){
      let optionValuePair:any = {};
      options.map((option: any, index: any) => {
        let optionName = stringToCamelCase(option);
        return optionValuePair[optionName] = values[checkboxId] && values[checkboxId].includes(optionName);
      }
      );
      setOptionsCheckedValues({...optionsCheckedValues, ...optionValuePair})
    }
  }, [getValues.checkboxId]);
  
  
  
  
  return (
    <div className={`${hide && "hidden"}`}>
      <QuestionBox required={hide ? hide : required} question={question}/>
      <Spacer className="mb-2"/>
      { options.map((option: any, index: any) => {
        const name = stringToCamelCase(option)
        console.log("nname",name,checkboxId)
        const handleClick = (e:any) => {
          // if(!e.target.checked){
          //   const obj:any = {}
          //   obj[`rating_${id}_${e.target.value}`] = false;
          //   obj[`ratingCommentBox_${id}_${e.target.value}`] = false;
          //   setValue(`rating_${id}_${e.target.value}`,false)
          //   setValue(`ratingCommentBox_${id}_${e.target.value}`,false);
          // }
          // if(expandOptionsToQuestions){
          //   let optionValuePair:any = {};
          //   optionValuePair[name] = e.target.checked;
          //   setOptionsCheckedValues({...optionsCheckedValues, ...optionValuePair});
          // }
      }

      console.log("required",required)
        return (
          <div key={index}>
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={name}
                  name={checkboxId}
                  value={name}
                  onClick={handleClick}
                  {...register(checkboxId,{required:required ? 'Please mark atleast one checkbox' : false})}
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor={name}
                  className="text-base text-gray-700 font-light"
                >
                  {option}
                </label>
              </div>
            </div>
            <Spacer className="mb-1" />
          </div>
        );
      })}
      <ErrorMessage
        errors={errors}
        name={checkboxId}
        render={({ message }) => <p className="mt-2 text-sm text-red-500">{message}</p>}
      />
      {/* Options creating over the time. */}
      {
         expandOptionsToQuestions && options.map((option:any,index:number)=>{
          const name: any = stringToCamelCase(option)
          return(<Rating
          key={index}
          hide={!(optionsCheckedValues as any)[name]}
          errors={errors}
          register={register}
          control={control}
          id={id + "_" + name}
          question={option}
          stars={5}
          required={(optionsCheckedValues as any)[name]}
          placeholder={`Comments on ${option}`}
          comments={true}
        />);
        })
      }
    </div>
  );
};

export default CheckBox;
