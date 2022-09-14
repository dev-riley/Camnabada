import SearchAll from "../components/searchResult/SearchAll";
import NavBar from "../components/common/NavBar";
import StickyFooter from '../components/common/Footer';


export default function Search () {

  return (
    <div>
      <NavBar></NavBar>
      <SearchAll></SearchAll>
      <StickyFooter></StickyFooter>
    </div>
  )
}