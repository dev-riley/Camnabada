import NavBar from "../components/common/NavBar";
import Album from "../components/main/Album";
import SelectVariants from "../components/main/SelectVariants";
import NewsFeed from "../components/main/NewsFeed";
import StickyFooter from '../components/common/Footer';
// import footerCss from '../styles/footerCss.css'


// 현재 인기 캠핑장 순위
function Main() {
  //카카오 access token받기
  const current = decodeURI(window.location.href);
  const search = current.split("?")[1];
  const params = new URLSearchParams(search);
  const keyword = params.get('kakao_token');

  if (keyword !== null) {
    localStorage.removeItem("accessToken");
    localStorage.setItem("accessToken", "Bearer " + keyword);
  }

  return (
    <div>

        <NavBar></NavBar>
        <SelectVariants></SelectVariants>
        <Album></Album>
        <NewsFeed></NewsFeed>
        <StickyFooter></StickyFooter>

    </div>

  )
}



export default Main;