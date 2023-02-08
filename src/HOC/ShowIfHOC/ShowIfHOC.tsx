import ContainerSelector from "../../components/ContainerSelector/ContainerSelector";
import {useState,useEffect} from "react";

interface ShowIfHOCProps{
    response: any;
    control: any;
    register: any;
    errors: any;
    unregister: any;
    getValues: any;
    reset:any;
    setValue:any;
    watch?:any;
}

const ShowIfHOC = ({
    response,
    register,
    unregister,
    errors,
    control,
    getValues,
    reset,
    setValue,
    watch
  }:ShowIfHOCProps) => {
    const [hide, setHide] = useState(true);

    const {showIf,id} = response;
    const dependQuestionId:string = showIf[0].questions[0].id

    console.log("watch ins showIfHOC",watch()[`yesNo_${dependQuestionId}`]);

    console.log(dependQuestionId,showIf,id,"0000")

    useEffect(() => {
      
      if(watch()[`yesNo_${dependQuestionId}`] === "Yes"){
        setHide(false);
      }else{
        setHide(true);
      }
      
    }, [watch()[`yesNo_${dependQuestionId}`]]);

  return (
      <>
      <ContainerSelector
        hide={hide}
        response={response}
        control={control}
        register={register}
        errors={errors}
        unregister={unregister}
        getValues={getValues}
        reset={reset}
        setValue={setValue}
      />
      </>
  )
}

export default ShowIfHOC