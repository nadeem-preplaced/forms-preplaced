import InputArray from "../InputArray/InputArray";
import YesNoSelectorContainer from "../../container/YesNoSelectorContainer/YesNoSelectorContainer";
import RatingContainer from "../../container/RatingContainer/RatingContainer";
import CheckBoxContainer from "../../container/CheckBoxContainer/CheckBoxContainer";
import SelectContainer from "../../container/SelectContainer/SelectContainer";
import InputContainer from "../../container/InputContainer/InputContainer";
import ScaleContainer from "../../container/ScaleContainer/ScaleContainer";
interface ContainerSelectorProps{
    response: any;
    control: any;
    register: any;
    errors: any;
    unregister: any;
    getValues: any;
    reset:any;
    setValue:any;
    hide?:boolean;
    watch?:any;
}

const ContainerSelector = ({
    response,
    watch,
    control,
    register,
    errors,
    unregister,
    getValues,
    reset,
    setValue,
    hide
  }:ContainerSelectorProps) => {
    switch (response.questionType) {
        case "Rating":
          return (
            <>
              <RatingContainer
                hide={hide}
                errors={errors}
                register={register}
                control={control}
                response={response}
                getValues={getValues()}
              />
            </>
          );
        case "Input Array":
          return (
            <>
              <InputArray control={control} response={response} />
            </>
          );
        case "Scale":
          return (
            <>
              <ScaleContainer
                hide={hide}
                errors={errors}
                register={register}
                response={response}
              />
            </>
          );
        case "Checkbox":
          return (
            <>
              <CheckBoxContainer
              hide={hide}
              setValue={setValue}
              getValues={getValues}
              errors={errors}
              unregister={unregister}
              register={register}
              control={control}
              response={response}
              reset={reset}
              />
            </>
          );
        case "Select":
          return (
            <SelectContainer
              hide={hide}
              register={register}
              errors={errors}
              getValues={getValues}
              response={response}
              control={control}
            />
          );
        case "Input":
          return <InputContainer hide={hide} control={control} response={response} />;
        default:
          return (
            <>
              <YesNoSelectorContainer
                hide={hide}
                errors={errors}
                register={register}
                response={response}
              />
            </>
          );
      }
}

export default ContainerSelector