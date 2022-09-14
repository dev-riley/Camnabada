import MessageRoom from "./MessageRoom";


const IfRoomId = (props) => {
  console.log('이프룸에서 룸아이디:', props.roomId);
  console.log('opp User : ' + props.oppUserId +" "+ props.oppNickname);
  if (props.roomId === null) {
    return <div>채팅방을 선택해주세요.</div>
  } else {
    return <MessageRoom roomId={props.roomId} userId={props.userId} nickname={props.nickname} oppUserId={props.oppUserId} oppNickname={props.oppNickname}getLists={props.getLists}></MessageRoom>
  }
}

export default IfRoomId;