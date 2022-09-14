import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./routes/Main";
import NoLogin from "./routes/NoLogin";
import SignUp from "./routes/Signup";
import Login from "./routes/Login";
import Community from "./routes/Community";
import Message from "./routes/Message";
import Search from "./routes/Search";
import BoardUpdate from "./routes/board/BoardUpdate";
import Create from "./routes/board/Create";
import BoardDetail from "./routes/board/BoardDetail";
import CampingDetail from "./routes/camping/CampingDetail";
import CampingFiltering from "./routes/camping/CampingFiltering";
import Profile from "./routes/profile/Profile";
import Update from "./routes/profile/ProfileUpdate";
import SearchCamping from "./routes/search/SearchCamping";
import SearchUser from "./routes/search/SearchUser";
import SearchCommunity from "./routes/search/SearchCommunity";
import CampingCommunity from "./routes/camping/CampingCommunity";
import SearchCampingSigungu from "./routes/search/SearchCampingSigungu";
import SearchCampingByKeyword from "./routes/search/SearchCampingByKeyword";


function App() {
  // const theme = createTheme({

  // })

  return (
    <Router>
      <Routes>
        <Route path="/main" element={<Main></Main>}></Route>
        <Route path="/" element={<NoLogin></NoLogin>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/community" element={<Community></Community>}></Route>
        <Route path="/message" element={<Message></Message>}></Route>
        
        {/* board */}
        {/* 게시글 상세 링크 수정 이게 맞나..?*/}
        <Route path="/board/update/:boardId" element={<BoardUpdate></BoardUpdate>}></Route>
        <Route path="/board/:boardId" element={<BoardDetail></BoardDetail>}></Route>
        <Route path="/create" element={<Create></Create>}></Route>
        <Route path="/community/:campId" element={<CampingCommunity></CampingCommunity>}></Route>


        {/* camping */}
        {/* 캠핑장 상세 링크 수정 */}
        {/* 캠핑장 상세 수정해야함 */}
        <Route path="/camping/:campId" element={<CampingDetail></CampingDetail>}></Route>

        {/* profile */}
        {/* 프로필 편집 링크 수정 */}
        <Route path="/profile/:nick" element={<Profile></Profile>}></Route>
        <Route path="/profile/update/:nick" element={<Update></Update>}></Route>

        {/* 내브바 검색 */}
        <Route path="/searchall/:keyword" element={<Search></Search>}></Route>
        {/* 메인에서 캠핑장 검색 */}
        <Route path="/search/:campkeyword" element={<SearchCamping></SearchCamping>}></Route>
        {/* 메인에서 캠핑장 키워드만 검색 */}
        <Route path="/search/camp/:searchkeyword" element={<SearchCampingByKeyword></SearchCampingByKeyword>}></Route>
        <Route path="/search/:campkeyword/:campkeyword2" element={<SearchCampingSigungu></SearchCampingSigungu>}></Route>
        <Route path="/search/user" element={<SearchUser></SearchUser>}></Route>
        <Route path="/search/community" element={<SearchCommunity></SearchCommunity>}></Route>
        
      </Routes>
    </Router>
  )
}

export default App;
