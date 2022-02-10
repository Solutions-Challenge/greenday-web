import Menu from '../components/navigation/menu';
import SearchBar from '../components/SearchBar';
import Map from '../map/map'

const LoadMap = () => {
  return (
    <div>
      <Menu></Menu>
      <style jsx>{`
        #search-bar-map {
          background: lightgreen;
        }
          #search-bar {
            text-align: center;
            display: flex;
            width: 20%;
            float: left;
            background: lightgreen;
          }
          #map {
            width: 80%;
            float:right;
          }
          #space {
            color: lightgreen;
          }
        `}</style>
      <div id='search-bar-map'>
        <div id='search-bar'>
          <h1 id='space'>1</h1>
          <SearchBar></SearchBar>
        </div>
        <div id='map'>
          <Map></Map>
        </div>
      </div>
    </div>
  )
}

export default LoadMap;
