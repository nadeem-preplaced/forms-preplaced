import LongText from "../../components/LongText/LongText";
import ShortText from "../../components/ShortText/ShortText";

interface InputContainerProps {
  response: any;
  control: any;
  hide?:boolean;
}

const InputContainer = ({ response, control,hide }: InputContainerProps) => {
  const { type, question, required, options, placeholder } =
    response.qtInput[0];
  const {id} = response
  switch (type) {
    case "Short Text":
      return (
        <ShortText
          hide={hide}
          control={control}
          question={question}
          required={required}
          options={options}
          id={id}
          placeholder={placeholder}
        />
      );
    default:
      return (
        <LongText
          hide={hide}
          control={control}
          question={question}
          required={required}
          options={options}
          id={id}
          placeholder={placeholder}
        />
      );
  }
};

export default InputContainer;
