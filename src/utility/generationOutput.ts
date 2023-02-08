import { stringToCamelCase } from "./stringToCamelCase";

export const generateOutput = (questionData: any, answerData: any) => {
  //skeleton of the output data
  const skeletonOutRessult: any = {
    data: {
      forms: [
        {
          sections: [],
        },
      ],
    },
  };

  var questionDataInUse = questionData;
  var answerDataInUse = answerData;

  //genrating desired output data
  questionDataInUse.sections.map((section: any, sectionIndex: number) => {
    const answerKeysArrayInner = {
      questions: [],
    };

    try {
      console.log(
        "Section : ",
        answerDataInUse[sectionIndex],
        sectionIndex,
        answerDataInUse
      );
      if (Object.keys(answerDataInUse[sectionIndex]).length === 0) {
        var nullObject: any = {};
        answerKeysArrayInner.questions.push(nullObject as never);
      } else {
        const answerKeys = Object.keys(answerDataInUse[sectionIndex]);
        answerKeys.map((answerKey: any, index: number) => {
          section.questions.map((question: any, indexofOneSection: number) => {
            var answerId = answerKey.split("_");
            if (question.questionType === "Checkbox") {
              if (
                answerId.length === 3 &&
                question.qtCheckbox[0].id === answerId[1]
              ) {
                question.qtCheckbox[0].options.map(
                  (option: any, optionIndex: number) => {
                    const optionStringToCamelCase = stringToCamelCase(option);
                    if (optionStringToCamelCase === answerId[2]) {
                      var obj: any = {
                        question: option,
                        rating: answerDataInUse[sectionIndex][answerKey].rating,
                        comment:
                          answerDataInUse[sectionIndex][answerKey].comment,
                        label: question.qtCheckbox[0].field,
                        id: question.qtCheckbox[0].id,
                        type: question.questionType,
                        showInReport: question.qtCheckbox[0].showInReport,
                      };
                      obj.rating !== null &&
                        answerKeysArrayInner.questions.push(obj as never);
                    }
                  }
                );
              } else if (
                answerId.length === 2 &&
                question.qtCheckbox[0].id === answerId[answerId.length - 1]
              ) {
                const backToOriginalAnswer: any = [];
                answerDataInUse[sectionIndex][answerKey].map(
                  (asnwerOption: any, answerOptionIndex: number) => {
                    question.qtCheckbox[0].options.map(
                      (option: any, indexOption: number) => {
                        const optionName = stringToCamelCase(option);
                        if (optionName === asnwerOption) {
                          backToOriginalAnswer.push(option);
                        }
                      }
                    );
                  }
                );

                const checkBoxAnswer = {
                  question: question.qtCheckbox[0].question,
                  label: question.qtCheckbox[0].field,
                  id: question.qtCheckbox[0].id,
                  type: question.questionType,
                  value: backToOriginalAnswer.join(","),
                  showInReport: question.qtCheckbox[0].showInReport,
                };
                answerDataInUse[sectionIndex][answerKey] !== null &&
                  answerKeysArrayInner.questions.push(checkBoxAnswer as never);
              }
            } else if (
              answerId.length === 2 &&
              question.questionType === "Rating" &&
              answerKey.split("_")[0] === "rating" &&
              question.qtRating[0].id === answerId[answerId.length - 1]
            ) {
              if (answerDataInUse[sectionIndex][answerKey].rating) {
                var ratingAnswer = {
                  question: question.qtRating[0].question,
                  label: question.qtRating[0].field,
                  id: question.qtRating[0].id,
                  type: question.questionType,
                  rating: answerDataInUse[sectionIndex][answerKey].rating,
                  comment: answerDataInUse[sectionIndex][answerKey].comment,
                  showInReport: question.qtRating[0].showInReport,
                };

                ratingAnswer.rating !== null &&
                  answerKeysArrayInner.questions.push(ratingAnswer as never);
              } else {
                var ratingAnswerOnly = {
                  question: question.qtRating[0].question,
                  label: question.qtRating[0].field,
                  id: question.qtRating[0].id,
                  type: question.questionType,
                  value: answerDataInUse[sectionIndex][answerKey],
                  showInReport: question.qtRating[0].showInReport,
                };

                answerDataInUse[sectionIndex][answerKey] !== null &&
                  answerKeysArrayInner.questions.push(
                    ratingAnswerOnly as never
                  );
              }
            } else if (question.questionType === "Select") {
              if (
                question.qtSelect[0].id === answerId[1] &&
                question.qtSelect[0].type === "Multi Select"
              ) {
                var SelectedOptions: any = [];

                question.qtSelect[0].options.map(
                  (
                    optionFromQuestion: any,
                    optionFromQuestionIndex: number
                  ) => {
                    answerDataInUse[sectionIndex][answerKey].map(
                      (answer: any, answerIndex: number) => {
                        if (optionFromQuestion === answer.value) {
                          SelectedOptions.push(answer.value);
                        }
                      }
                    );
                  }
                );
                var MultiSelect = {
                  question: question.qtSelect[0].question,
                  label: question.qtSelect[0].field,
                  id: question.qtSelect[0].id,
                  type: question.qtSelect[0].type,
                  value: SelectedOptions.join(","),
                  showInReport: question.qtSelect[0].showInReport,
                };
                SelectedOptions.join(",") !== null &&
                  answerKeysArrayInner.questions.push(MultiSelect as never);
              } else if (
                question.qtSelect[0].id === answerId[1] &&
                question.qtSelect[0].type === "Single Select"
              ) {
                var SingleSelect = {
                  question: question.qtSelect[0].question,
                  label: question.qtSelect[0].field,
                  id: question.qtSelect[0].id,
                  type: question.qtSelect[0].type,
                  value: answerDataInUse[sectionIndex][answerKey].value,
                  showInReport: question.qtSelect[0].showInReport,
                };
                answerDataInUse[sectionIndex][answerKey].value !== null &&
                  answerKeysArrayInner.questions.push(SingleSelect as never);
              }
            } else if (question.questionType === "Input") {
              if (question.qtInput[0].id === answerId[1]) {
                var Text = {
                  question: question.qtInput[0].question,
                  label: question.qtInput[0].field,
                  id: question.qtInput[0].id,
                  type: question.questionType,
                  value: answerDataInUse[sectionIndex][answerKey],
                  showInReport: question.qtInput[0].showInReport,
                };
                answerDataInUse[sectionIndex][answerKey] !== null &&
                  answerKeysArrayInner.questions.push(Text as never);
              }
            } else if (question.questionType === "Scale") {
              if (question.qtScale[0].id === answerId[1]) {
                var Scale = {
                  question: question.qtScale[0].question,
                  label: question.qtScale[0].field,
                  id: question.qtScale[0].id,
                  type: question.questionType,
                  value: answerDataInUse[sectionIndex][answerKey],
                  showInReport: question.qtScale[0].showInReport,
                };
                answerDataInUse[sectionIndex][answerKey] !== null &&
                  answerKeysArrayInner.questions.push(Scale as never);
              }
            } else if (
              answerId.length === 2 &&
              question.questionType === "Yes / No" &&
              question.qtYesNo[0].id === answerId[1]
            ) {
              var yesNoAnswer = {
                question: question.qtYesNo[0].question,
                label: question.qtYesNo[0].field,
                id: question.qtYesNo[0].id,
                type: question.questionType,
                value: answerDataInUse[sectionIndex][answerKey],
                showInReport: question.qtYesNo[0].showInReport,
              };
              answerDataInUse[sectionIndex][answerKey] !== null &&
                answerKeysArrayInner.questions.push(yesNoAnswer as never);
            }
          });
        });
      }
    } catch (e) {
      console.error("Error: ", e);
    }

    skeletonOutRessult.data.forms[0].sections.push(answerKeysArrayInner);
  });

  return skeletonOutRessult;
};
