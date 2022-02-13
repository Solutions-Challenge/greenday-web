import { Loader } from '@googlemaps/js-api-loader';

let map: google.maps.Map;
const json = require('../places.json');

const loader = new Loader({
  apiKey: process.env.GOOGLE_API_KEY!,
  version: 'weekly',
});

loader.load()
  .then(() => {
    const styledMapType = new google.maps.StyledMapType(
      [
        {
          featureType: 'administrative',
          elementType: 'geometry',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'poi',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'road',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'transit',
          stylers: [{ visibility: 'off' }],
        },
      ],
      { name: 'Styled Map' }
    );

    map = new google.maps.Map(
      document.getElementById('google-map') as HTMLElement,
      {
        center: { lat: json.Center.lat, lng: json.Center.lng },
        zoom: 8,
        mapTypeControlOptions: {
          mapTypeIds: [
            'roadmap',
            'satellite',
            'hybrid',
            'terrain',
            'styled_map',
          ],
        },
      }
    );

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
  })
  .then(() => {
    console.log(map);
  });

export { map };