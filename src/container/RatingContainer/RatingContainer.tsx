import Rating from "../../components/Rating/Rating";

interface RatingContainerProps {
  response: any;
  control?: any;
  register?: any;
  errors?: any;
  getValues?:any;
  hide?:any;
}
const RatingContainer = ({
  response,
  control,
  register,
  errors,
  getValues,
  hide
}: RatingContainerProps) => {
  const { question, required, stars, commentsPlaceholder, comments } =
  response.qtRating[0];
  const { id } = response;
  return (
    <>
      <Rating
        hide={hide}
        getValues={getValues}
        errors={errors}
        register={register}
        control={control}
        id={id}
        question={question}
        stars={stars}
        required={required}
        placeholder={commentsPlaceholder}
        comments={comments}
      />
    </>
  );
};

export default RatingContainer;
