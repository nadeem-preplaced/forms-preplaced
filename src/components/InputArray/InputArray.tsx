import { PlusIcon } from "@heroicons/react/solid";
import Spacer from "../Spacer/Spacer";
import { useState } from "react";

interface InputArrayProps {
  response: any;
  control?: any;
}

const InputArray = ({ response, control }: InputArrayProps) => {
  const { question, id, placeholder } = response;

  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
      placeholder: placeholder,
    },
  ];

  const [arr, setArr] = useState(inputArr);

  const addInput = () => {
    setArr((prev: any) => {
      return [
        ...prev,
        {
          type: "text",
          value: "",
          placeholder: placeholder,
        },
      ];
    });
  };

  const handleChange = (e: any) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };
  return (
    <>
      <Spacer className="mb-4" />
      <div className="text-xl font-medium text-gray-700">{question}</div>
      <Spacer className="mb-4" />
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        {arr.map((item: any, i: any) => {
          return (
            <>
              <input
                type="text"
                onChange={handleChange}
                value={item.value}
                id={i}
                placeholder={item.placeholder}
                //   id="first-name"
                //   autoComplete="given-name"
                className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
              <Spacer className="mb-4" />
            </>
          );
        })}
      </div>
      <Spacer className="mb-4" />
      <div className="text-center">
        <PlusIcon
          onClick={addInput}
          className="w-8 inline-block border-2 border-black rounded-full cursor-pointer"
        />
      </div>
    </>
  );
};

export default InputArray;
