import newJSON from "./SampleFormsData.json";
import MultiFormIndicator from "./components/MultiFormIndicator/MultiFormIndicator";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { settingData } from "./redux/formDataReducer/formDataReducer";
import FormBuilder from "./FormBuilder";
import { generateOutput } from "./utility/generationOutput";
import { postCall } from "./apiServices/apiServices";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.formData);

  useEffect(() => {
    // console.log(newJSON)
    dispatch(settingData(newJSON.data.forms[0])); //API calling
  }, []);

  useEffect(() => {
    console.log("stepForm", state);
    if(state.currentPage > state.totalPage){
      const outpuToSend = generateOutput(state.data,state.stepFormData);
      console.log("outpuToSend",outpuToSend);
      const requestBody = {
        "formId": "recESEQJvkGQkbVSn",
        "response": JSON.stringify(outpuToSend)
      }
      const postHoGaya = postCall({url:"https://hooks.airtable.com/workflows/v1/genericWebhook/appOG1FcZiHP3tVL3/wfl325yXn0xaWdd4E/wtr5N22Td4UjZwG0I",requestBody:requestBody})

      console.log(postHoGaya)
    }
  }, [state]);

  return (
    <>
      <div className="h-full flex flex-col items-center justify-between">
        {state.currentPage <= state.totalPage && (
          <div className="max-w-screen-sm px-2 w-full">
            <MultiFormIndicator />
          </div>
        )}
        {state.data.sections && state.currentPage <= state.totalPage ? (
          state.data.sections.map((pageData: any, pageIndex: number) => {
            return (
              <div key={pageIndex} className={`w-full ${pageIndex===state.currentPage && 'h-full overflow-hidden'}`}>
                <FormBuilder pageIndex={pageIndex} pageData={pageData} />
              </div>
            );
          })
        ) : (
          <h1>Thanks You Page</h1>
        )}
      </div>
    </>
  );
}

export default App;
