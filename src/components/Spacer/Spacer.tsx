interface SpacerProps{
    className: string;
}

const Spacer = ({className}:SpacerProps) => {
  return (
    <div className={className ? className : 'mb-0'}></div>
  )
}

export default Spacer