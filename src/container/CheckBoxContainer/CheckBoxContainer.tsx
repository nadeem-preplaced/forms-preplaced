import { useEffect, useState } from "react";
import CheckBox from "../../components/CheckBox/CheckBox";
interface CheckBoxContainerProps {
  response: any;
  control: any;
  register: any;
  unregister: any;
  errors?: any;
  getValues?: any;
  reset?: any;
  setValue?: any;
  hide?:boolean;
}
const CheckBoxContainer = ({
  response,
  register,
  unregister,
  errors,
  control,
  getValues,
  reset,
  setValue,
  hide
}: CheckBoxContainerProps) => {
  const { options, question, required, expandOptionsToQuestions, field } =
    response.qtCheckbox[0];
  const { id } = response;

  return (
    <>
        <CheckBox
          hide={hide}
          setValue={setValue}
          reset={reset}
          getValues={getValues}
          control={control}
          errors={errors}
          unregister={unregister}
          register={register}
          id={id}
          options={options}
          question={question}
          required={required}
          expandOptionsToQuestions={expandOptionsToQuestions}
          field={field}
        />
    </>
  );
};

export default CheckBoxContainer;
