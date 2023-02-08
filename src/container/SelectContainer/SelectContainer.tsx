import MultiSelect from "../../components/MultiSelect/MultiSelect";
import SingleSelect from "../../components/SingleSelect/SingleSelect";

interface SelectContainerProps{
  response:any;
  control:any;
  getValues:any;
  register:any;
  errors:any;
  hide?:boolean;
}

const SelectContainer = ({response,control,getValues,register,errors,hide}:SelectContainerProps) => {
  const {type,question,required,options,expandOptionsToQuestions} = response.qtSelect[0];
  const {id} = response;
  switch(type){
    case "Single Select":
      return(
        <SingleSelect hide={hide} control={control} question={question} required={required} options={options} id={id}/>
      )
    case "Multi Select":
      return(
        <MultiSelect hide={hide} expandOptionsToQuestions={expandOptionsToQuestions} register={register} errors={errors} getValues={getValues} control={control} question={question} required={required} options={options} id={id} />
      )
    default:
      return<></>
  }
}

export default SelectContainer