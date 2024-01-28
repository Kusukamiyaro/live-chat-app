import React from 'react'

function MessageOthers({props}) {
    const props1 = props
    console.log(props);
  return (
    <div className='other-message-container'>
        <div className='conversation-container'>
        <p className='convo-icon'> {props1.sender.name[0]}</p>
        <div className='other-text-message'>
        <p className='convo-title'>{props1.sender.name}</p>
        <p className='convo-lastMessage'>{props1.content}</p>
        <p className='convo-timeStamp'>{props1.timeStamp}</p>
        </div>
        </div>

    </div>
  )
}

export default MessageOthers