const Message = ({message, success}) => {
  if (success === undefined) 
    return <div></div>
  
  const className = success ? 'message-success' : 'message-error'
  return (
    <div className={`${className} message`}>
      {message}
    </div>
  )
}

export default Message