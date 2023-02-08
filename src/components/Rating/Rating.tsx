import FilledStar from "../FilledStar/FilledStar";
import UnfilledStart from "../UnfilledStar/UnfilledStart";
import { useState, useEffect } from "react";
import Spacer from "../Spacer/Spacer";
import CommentBox from "../CommentBox/CommentBox";
import { ErrorMessage } from "@hookform/error-message";
import QuestionBox from "../QuestionBox/QuestionBox";
import { useSelector } from "react-redux";

interface RatingProps {
  control: any;
  question: string;
  id: any;
  required: any;
  placeholder: string;
  stars: number;
  comments?: boolean;
  register?: any;
  errors?: any;
  hide?: any;
  getValues?: any;
}

const Rating = ({
  control,
  question,
  placeholder,
  required,
  id,
  stars,
  comments,
  register,
  errors,
  hide,
  getValues,
}: RatingProps) => {
  const [renderTextFiled, setRenderTextFiled] = useState(comments);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const ratingId = "rating_" + id;
  const state = useSelector((state: any) => state.formData);

  useEffect(() => {
    if(state.stepFormData[state.currentPage]){
      if(+state.stepFormData[state.currentPage][ratingId]?.rating){
        setRating(+state.stepFormData[state.currentPage][ratingId].rating);
      }else{
        setRating(+state.stepFormData[state.currentPage][ratingId]);
      }
    }
  }, [state.stepFormData,hide]);
  
  

  const handleClick = (index: any) => {
    !renderTextFiled && setRenderTextFiled(true);
    setRating(index);
  };

  const handleMouseEnter = (index: number) => {
    setHover(index);
  };

  const handleMouseLeave = (rating: number) => {
    setHover(rating);
  };

  return (
    <div className={`${hide ? "hidden" : "block"}`}>
      <Spacer className="mb-4" />
      <QuestionBox question={question} required={required} />
      <Spacer className="mb-4" />
      <div className="flex flex-row gap-1">
        {[...Array(+stars)].map((star, index: any) => {
          index += 1;
          return (
            <div className={`relative`} key={index}>
              <input
                className="sr-only peer"
                type="radio"
                value={index}
                id={ratingId + "_" + index}
                {...register(ratingId, {
                  required: required ? "Please Select Yes or No" : false,
                })}
              />
              <label
                className={`flex p-2 bg-white rounded-lg cursor-pointer focus:outline-none pt-0 ${index===1 && 'pl-0'}`}
                htmlFor={ratingId + "_" + index}
                onClick={(e) => handleClick(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(rating)}
              >
                {index <= (hover || rating) ? (
                  <FilledStar className="w-8" />
                ) : (
                  <UnfilledStart className="w-8" />
                )}
              </label>
            </div>
          );
        })}
      </div>

      <ErrorMessage
        errors={errors}
        name={ratingId}
        render={({ message }) => (
          <p className="mt-2 text-sm text-red-500">{message}</p>
        )}
      />
      <Spacer className="mb-4" />
      {comments && (
        <CommentBox
          control={control}
          id={"ratingCommentBox_" + id}
          placeholder={placeholder}
          renderTextFiled={renderTextFiled}
          required={required}
        />
      )}
    </div>
  );
};

export default Rating;
