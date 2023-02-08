import React from "react";
import Scale from "../../components/Scale/Scale";

interface ScaleContainerProps {
  response: any;
  register: any;
  errors: any;
  hide?:boolean;
}
const ScaleContainer = ({
  response,
  register,
  errors,
  hide
}: ScaleContainerProps) => {
  const { question, required, scale, startingLabel, endingLabel } =
    response.qtScale[0];
    const {id} = response;
  return (
      <Scale
        hide={hide}
        errors={errors}
        register={register}
        question={question}
        required={required}
        id={id}
        scale={scale + 1}
        endingLabel={endingLabel}
        startingLabel={startingLabel}
      />
  );
};

export default ScaleContainer;
