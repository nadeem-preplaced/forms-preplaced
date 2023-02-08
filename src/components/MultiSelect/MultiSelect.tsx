import { colourOptions } from "../../utility/SelectorOptionsColor";
import Select from "react-select";
import colourStyles from "./colorSelection";
import Spacer from "../Spacer/Spacer";
import { Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { stringToCamelCase } from "../../utility/stringToCamelCase";
import Rating from "../Rating/Rating";
import QuestionBox from "../QuestionBox/QuestionBox";
interface MultiSelectProps {
  control: any;
  question: string;
  id: any;
  options: any;
  required: boolean;
  getValues: any;
  register: any;
  errors: any;
  expandOptionsToQuestions: any;
  hide?:boolean;
}

const MultiSelect = ({
  question,
  id,
  options,
  required,
  control,
  getValues,
  expandOptionsToQuestions,
  errors,
  register,
  hide
}: MultiSelectProps) => {
  const setIntialSelectedOptionsMap = () => {
    if (expandOptionsToQuestions) {
      let optionValuePair: any = {};
      options.map((option: any, index: any) => {
        let optionName = stringToCamelCase(option);
        return (optionValuePair["rating_" + id + "_" + optionName] = false);
      });
      return optionValuePair;
    }
  };
  const [optionSelectedValues, setOptionsSelectedValues] = useState(
    setIntialSelectedOptionsMap()
  );
  const multiSelectId = "multiSelect_" + id;
  const values = getValues();

  useEffect(() => {
    if (values && values[multiSelectId]) {
      setSelectedOptionsMap(values[multiSelectId]);
    }
  }, []);

  const error = "Please Select";

  const colorOptionForSelect: any = [];

  options.map((item: any) => {
    colorOptionForSelect.push({
      value: item,
      label: item,
      color: colourOptions[Math.floor(Math.random() * colourOptions.length)],
    });
  });

  const setSelectedOptionsMap = (values: Array<any>) => {
    if (expandOptionsToQuestions) {
      let optionValuePair: any = {};
      options.map((option: any, index: any) => {
        let optionName = stringToCamelCase(option);
        return (optionValuePair["rating_" + id + "_" + optionName] = undefined);
      });

      values.map((value: any, valueIndex: number) => {
        let optionName = stringToCamelCase(value.value);
        optionValuePair["rating_" + id + "_" + optionName] = true;
      });
      setOptionsSelectedValues({ ...optionSelectedValues, ...optionValuePair });
    }
  };

  const handleChange = (e: any) => {
    const values: any = e;
    setSelectedOptionsMap(values);
    return e;
  };

  return (
    <div className={`${hide && "hidden"}`}>
      <Spacer className="mb-4" />
      <QuestionBox question={question} required={required}/>
      <Spacer className="mb-4" />
      <Controller
        name={multiSelectId}
        control={control}
        rules={{ required: required }}
        render={({ field, fieldState }) => (
          <>
            <Select
              value={field.value}
              onChange={(e) => field.onChange(handleChange(e))}
              ref={field.ref}
              closeMenuOnSelect={false}
              isMulti
              options={colorOptionForSelect}
              styles={colourStyles}
            />
            {fieldState.error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </>
        )}
      />

      {expandOptionsToQuestions &&
        options.map((option: any, index: number) => {
          const name: any = stringToCamelCase(option);
          return (
            <Rating
              key={index}
              hide={!(optionSelectedValues as any)["rating_" + id + "_" + name]}
              errors={errors}
              register={register}
              control={control}
              id={id + "_" + name}
              question={option}
              stars={5}
              required={
                (optionSelectedValues as any)["rating_" + id + "_" + name]
              }
              placeholder={`Comments on ${option}`}
              comments={true}
              // expandOptionsToQuestions={expandOptionsToQuestions}
            />
          );
        })}
    </div>
  );
};

export default MultiSelect;
