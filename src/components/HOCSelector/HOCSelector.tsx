import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stringToCamelCase } from "../../utility/stringToCamelCase";
import ContainerSelector from "../ContainerSelector/ContainerSelector";

interface ComponentSelectorProps {
  response: any;
  control?: any;
  register?: any;
  errors?: any;
  unregister?: any;
  getValues?: any;
  reset?: any;
  setValue?: any;
  watch?: any;
}

const ComponentSelector = ({
  response,
  control,
  register,
  errors,
  unregister,
  getValues,
  reset,
  setValue,
  watch,
}: ComponentSelectorProps) => {
  const { showIf, id } = response;
  const dependQuestionId: string = showIf[0]?.questions[0]?.id;
  const { condition, value } = showIf.length !== 0 && showIf[0];
  const state = useSelector((state: any) => state.formData);



  const inputTypeQuestionCondition = (commonWatch:any) => {
    
  }



  const ratingTypeQuestionCondition = (commonWatch:any) => {
    console.log("ratingWatch",commonWatch,condition,value)
    if (commonWatch) {
      switch (condition) {
        case "=":
          return value === commonWatch;
        case "!=":
          return value !== commonWatch;
        case ">":
          return value > commonWatch;
        case "<":
          return value < commonWatch;
        case ">=":
          return value >= commonWatch;
        case "<=":
          return value <= commonWatch;
        case "is not empty":
          return commonWatch;
      }
    }
  }


  const stringTypeQuestionCondition = (commonWatch:any) => {
    if (commonWatch) {
      switch (condition) {
        case "=":
          return commonWatch === value;
        case "!=":
          return commonWatch !== value;
        case "is none of":
          return !value.split(",").includes(commonWatch);
        case "is any of":
        case "is not empty":
          return value.split(",").includes(commonWatch);
      }
    }
  }

  

  const multiTypeQuestionCondition = (commonWatch: any) => {
    if (commonWatch) {
      switch (condition) {
        case "=":
          return commonWatch.includes(stringToCamelCase(value));
        case "!=":
          return !commonWatch.includes(stringToCamelCase(value));
        case "is any of":
          return value.split(",").some((val: any) => {
            return commonWatch.includes(stringToCamelCase(val));
          });
        case "is none of":
          return (
            commonWatch.length !== 0 &&
            !value.split(",").some((val: any) => {
              return commonWatch.includes(stringToCamelCase(val));
            })
          );
        case "is not empty":
          return commonWatch.length !== 0;
      }
    }
  };

  const selectWatchCondition = () => {
    switch (showIf[0]?.questions[0].questionType) {
      case "Yes / No":
        const yesNoWatch = watch()[`yesNo_${dependQuestionId}`];
        return stringTypeQuestionCondition(yesNoWatch);
      case "Checkbox":
        const checkBoxWatch = watch()[`checkbox_${dependQuestionId}`];
        return multiTypeQuestionCondition(checkBoxWatch);
      case "Select":
        var multiSelectBoxWatch;
        var singleSelectBoxWatch;
        if (showIf[0]?.questions[0].id) {
          state.data.sections[state.currentPage].questions.map((value: any) => {
            if (value.id === showIf[0]?.questions[0].id) {              
              if (value?.qtSelect[0].type === "Multi Select") {
                multiSelectBoxWatch =
                  watch()[`multiSelect_${dependQuestionId}`] &&
                  watch()[`multiSelect_${dependQuestionId}`].map(
                    (val: any, index: number) => {
                      return val.value;
                    }
                  );
              } else {
                singleSelectBoxWatch = watch()[`singleSelect_${dependQuestionId}`] && watch()[`singleSelect_${dependQuestionId}`].value
              }
            }
          });
          if(multiSelectBoxWatch){
            return multiTypeQuestionCondition(multiSelectBoxWatch);
          }else{
            return stringTypeQuestionCondition(singleSelectBoxWatch);
            
          }
        }
        break;
      case "Rating":
        const ratingWatch = watch()[`rating_${dependQuestionId}`];
        return ratingTypeQuestionCondition(ratingWatch);
      case "Scale":
        const scaleWatch = watch()[`scale_${dependQuestionId}`];
        return ratingTypeQuestionCondition(scaleWatch);
      
    }
  };

  const showQuestion: any =
    showIf.length === 0 || (showIf.length !== 0 && selectWatchCondition());
  const [hidden, setHidden] = useState(!showQuestion);

  useEffect(() => {
    setHidden(!showQuestion);
  }, [watch(), hidden]);

  return (
    <ContainerSelector
      hide={hidden}
      watch={watch}
      response={response}
      control={control}
      register={register}
      errors={errors}
      unregister={unregister}
      getValues={getValues}
      reset={reset}
      setValue={setValue}
    />
  );
};

export default ComponentSelector;
