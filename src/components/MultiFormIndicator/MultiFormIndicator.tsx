import { CheckIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spacer from "../Spacer/Spacer";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const MultiFormIndicator = () => {
  const state = useSelector((state:any)=>state.formData);
  const [steps, setSteps] = useState<any | null>(null);
  useEffect(() => {
    var stepsValues: any[] = [];
    if(state.totalPage > 0){
      for(let index=0; index <= state.totalPage; index++){
        stepsValues.push({
          name: `Step ${index + 1}`,
          status: state.currentPage === index ? "current" : (!(state.currentPage > index) ? "upcoming" : "complete")
        })
      }
    }
    setSteps(stepsValues);
  }, [state.currentPage, state.totalPage]);

  return (
    <>
    <nav aria-label="Progress" className="inline-block">
      <ol className="flex items-center justify-center">
        {steps &&
          steps.map((step: any, stepIdx: any) => (
            <li
              key={step.name}
              className={classNames(
                stepIdx !== (steps && steps.length - 1) ? "pr-6" : "",
                "relative"
              )}
            >
              {step.status === "complete" ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-blue-600" />
                  </div>
                  <div className="p-0.5 relative w-5 h-5 flex items-center justify-center bg-blue-600 rounded-full">
                    <CheckIcon
                      className="w-5 h-5 text-white"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step.name}</span>
                  </div>
                </>
              ) : step.status === "current" ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <div
                    className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-blue-600 rounded-full"
                    aria-current="step"
                  >
                    <span
                      className="h-4 w-4 bg-blue-600 rounded-full"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step.name}</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <div className="group relative w-5 h-5 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full">
                    <span
                      className="h-2.5 w-2.5 bg-transparent rounded-full bg-gray-300"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step.name}</span>
                  </div>
                </>
              )}
            </li>
          ))}
      </ol>
    </nav>
    <Spacer className="mb-8"/>
    </>
  );
};

export default MultiFormIndicator;
