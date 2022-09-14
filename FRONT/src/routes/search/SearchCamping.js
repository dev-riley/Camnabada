import SearchCampingAlbum from "../../components/searchResult/SearchCampingAlbum"
import NavBar from '../../components/common/NavBar'
import StickyFooter from "../../components/common/Footer"

export default function SearchCamping () {

  return (
    <div>
      <NavBar></NavBar>
      <SearchCampingAlbum></SearchCampingAlbum>
      <StickyFooter></StickyFooter>
    </div>
  )
}