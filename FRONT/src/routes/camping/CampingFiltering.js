import CampingFilteringAlbum from "../../components/searchResult/CampingFilteringAlbum";
import NavBar from "../../components/common/NavBar";
import StickyFooter from "../../components/common/Footer";


export default function CampingFiltering () {

  return (
    <div>
      <NavBar></NavBar>
      <CampingFilteringAlbum></CampingFilteringAlbum>
      <StickyFooter></StickyFooter>
    </div>
  )
}