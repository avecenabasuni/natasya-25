// Confirmed shared trip memories; owner-written photo captions can override them.
window.SCRAPBOOK_TRIP = Object.freeze({
  dates: '22–25 October 2026',
  shortDates: '22–25 October',
  places: 'Trier & Luxembourg',
  spine: 'Trier · Luxembourg · October 2026',
  reverseLabel: 'Trier · Luxembourg\n22–25.10.2026',
  map: 'assets/illustrations/trier-luxembourg-route.webp',
  mapVector: 'assets/illustrations/trier-luxembourg-route.svg',
  mapAlt: 'Our way there and back: RE11 railway from Trier to Luxembourg, with sleepers, and a dashed L31 bus return toward Trier. A geographically anchored schematic through Wasserbillig, with simplified connections rather than surveyed track or road geometry.',
  personalIntro: 'RE11 to Luxembourg. L31 back to Trier. In between: a city with you, and Indomie at the Airbnb.',
  stops: Object.freeze(['Plateau Bourbon','Pont Adolphe','Place de la Constitution','Ville Haute','Hämmelsmarsch fountain · Wil Lofy','Place Guillaume II','Notre-Dame Cathedral of Luxembourg','Palais Grand-Ducal','Chemin de la Corniche','Place de Clairefontaine','Pont du Grund']),
  featuredDayOrder: Object.freeze([1, 2, 0, 3]),
  days: Object.freeze([
    Object.freeze({date:'22 October',shortDate:'22 Oct',place:'Trier',location:'Trier · Germany',summary:'Katsu & my nuggets',memory:'Chicken katsu curry on our first day in Trier. Then McDonald’s nuggets for me, because you don’t like them. Those nuggets were very much my part of the trip.',prompt:'[A moment from our day in Trier.]'}),
    Object.freeze({date:'23 October',shortDate:'23 Oct',place:'Trier → Luxembourg',location:'Trier → Luxembourg',summary:'Malatang & Indomie',memory:'Bread in the morning in Trier. Yangguofu Malatang in Luxembourg that afternoon. Then Indomie goreng at our Luxembourg Airbnb that night.\n\nThe food deserves a place in this book, too.',prompt:'[A little discovery in Luxembourg.]'}),
    Object.freeze({date:'24 October',shortDate:'24 Oct',place:'Luxembourg → Trier',location:'Luxembourg → Trier · Germany',summary:'O’Tacos & Aldi',memory:'We skipped breakfast, then had O’Tacos for lunch. So good.\n\nLater, back in Trier, we picked up frozen food from Aldi for dinner.',prompt:'[A moment from Luxembourg, before returning to Trier.]'}),
    Object.freeze({date:'25 October',shortDate:'25 Oct',place:'Trier',location:'Trier · Germany',prompt:'[One last detail from Trier.]'})
  ])
});
