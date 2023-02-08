import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import HOCSelector from "./components/HOCSelector/HOCSelector";
import PreNextSubmitButton from "./components/PreNextSubmitButton/PreNextSubmitButton";
import Spacer from "./components/Spacer/Spacer";
import { setStepFormData, upgradeCurrentPage } from "./redux/formDataReducer/formDataReducer";
import { filterPagesData } from "./utility/filterData";
interface FormBuilderProps {
  pageIndex: number;
  pageData: any;
}

const FormBuilder = ({ pageIndex, pageData }: FormBuilderProps) => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.formData);
  
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    getValues,
    reset,
    setValue,
    watch
  } = useForm();

  const onSubmit = (data: any, e: any) => {
    dispatch(setStepFormData(filterPagesData(data)));
    handleClickNext(data);
  };

  const onError = (errors: any, e: any) => {
    console.log("errors", errors);
  };

  const handleClickNext = (dataAttr: any) => {
    dispatch(upgradeCurrentPage());
  };  

  return (
    <>
      {pageIndex === state.currentPage && (
        <form className="h-full w-full flex flex-col items-start justify-between" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className={`h-full w-full mb-7 overflow-y-auto ${'scroll-smooth'}`}>
            <div className="max-w-screen-sm px-4 m-auto">
          {pageData.sectionTitle && (
            <h1 className="text-4xl font-bold text-blue-700">{pageData.sectionTitle}</h1>
          )}
          {pageData.description && (
            <>
              <Spacer className="mb-2.5"/>
              <h6 className="text-xl font-light">{pageData.description}</h6>
              <Spacer className="mb-8" />{" "}
            </>
          )}

          {
            !pageData.description && <Spacer className="mb-8" />
          }

          {pageData.questions.map((question: any, questionIndex: number) => {
            return (
              <div key={questionIndex}>
                <HOCSelector
                  watch={watch}
                  setValue={setValue}
                  reset={reset}
                  errors={errors}
                  register={register}
                  control={control}
                  response={question}
                  getValues={getValues}
                />
                <Spacer className="mb-8" />
              </div>
            );
          })}
          </div>
          </div>
          <PreNextSubmitButton />
        </form>
      )}
    </>
  );
};

export default FormBuilder;
