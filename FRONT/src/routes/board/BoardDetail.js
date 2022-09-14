import BoardDetailMine from "../../components/board/BoardDetailMine";
import NavBar from "../../components/common/NavBar";
import StickyFooter from "../../components/common/Footer";

export default function BoardDetail () {

  return (
    <div>
      <NavBar></NavBar>
      <BoardDetailMine></BoardDetailMine>
      <StickyFooter/>
    </div>
  )
}