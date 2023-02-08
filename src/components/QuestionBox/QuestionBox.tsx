import React from 'react'

interface QuestionBoxProps{
    required:boolean;
    question:string;
}
const QuestionBox = ({question,required}:QuestionBoxProps) => {
  return (
    <div className="text-2xl font-medium text-gray-700">{question}<span className='text-red-500'>{(required) && "*"}</span></div>
  )
}

export default QuestionBox;