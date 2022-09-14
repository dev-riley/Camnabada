import SearchCampingKeyword from "../../components/searchResult/SearchCampingKeyword"
import NavBar from '../../components/common/NavBar'
import StickyFooter from "../../components/common/Footer"

export default function SearchCampingByKeyword () {

  return (
    <div>
      <NavBar></NavBar>
      <SearchCampingKeyword></SearchCampingKeyword>
      <StickyFooter></StickyFooter>
    </div>
  )
}