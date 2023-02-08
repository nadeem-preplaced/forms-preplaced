import YesNoSelector from "../../components/YesNoSelector/YesNoSelector";

interface YesNoSelectorContainerProps {
  response: any;
  register: any;
  errors:any;
  hide?:boolean;
}
const YesNoSelectorContainer = ({
  response,
  register,
  errors,
  hide
}: YesNoSelectorContainerProps ) => {

  const {question,required} = response.qtYesNo[0];
  const {id} = response;

return (
  <>
    <YesNoSelector hide={hide} errors={errors} register={register} id={id} question={question} required={required}/>
  </>
)
}

export default YesNoSelectorContainer