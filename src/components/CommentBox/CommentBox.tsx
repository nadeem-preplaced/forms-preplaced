import { Controller } from "react-hook-form";

interface CommentBoxProps{
    control:any;
    id:any;
    required:any;
    placeholder:string;
    renderTextFiled:any;
}
const CommentBox = ({id,required,placeholder,renderTextFiled,control}:CommentBoxProps) => {
    const error = "Please fill the field";
  return (
    <div className="mt-1 sm:mt-0 sm:col-span-2">
        <Controller
          name={id as never}
          control={control}
          rules={{ required : required }}
          render={
            ({ field, fieldState }) => (
            <>
              <textarea
                rows={3}
                ref={field.ref}
                value={field.value || ""}
                onChange={field.onChange}
                placeholder={placeholder}
                className={`shadow-sm sm:w-3/6 w-full sm:text-sm border border-gray-300 rounded-md ${
                  fieldState.error && "focus:ring-red-500 focus:border-red-500"
                } ${renderTextFiled ? " block" : " hidden"}`}
                // defaultValue={""}
              />
              {fieldState.error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
            </>
          )}
        />
      </div>
  )
}

export default CommentBox