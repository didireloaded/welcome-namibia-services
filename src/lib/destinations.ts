export type Place = {slug:string;name:string;kind:string;description:string};
export type Region = {slug:string;name:string;hub:string;image:string;intro:string;places:Place[]};
const place=(name:string,kind:string,description:string):Place=>({slug:name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/-$/,""),name,kind,description});
export const regions:Region[]=[
{slug:"khomas",name:"Khomas",hub:"Windhoek",image:"namibia",intro:"The capital is a practical base for appointments, city stays and onward travel.",places:[
place("Christuskirche","Attraction","Windhoek’s historic church sits near the city’s government and museum precinct. Combine an exterior visit with a walk through the central landmarks."),
place("Independence Memorial Museum","Museum","A central Windhoek museum focused on Namibia’s independence history. Check current opening hours and allow time for the exhibits."),
place("Daan Viljoen Game Reserve","Nature","A reserve west of Windhoek with walking and wildlife viewing opportunities. Confirm access, trails and accommodation arrangements before visiting."),
place("The Weinberg","Hotel","A hotel in Windhoek’s Klein Windhoek area, useful for a city stay with restaurants nearby. Compare room, breakfast and transfer terms directly."),
place("Joe’s Beerhouse","Restaurant","A well-known Windhoek restaurant with Namibian dishes and a lively setting. Reserve for busy evenings and ask about dietary preferences.")]},
{slug:"erongo",name:"Erongo",hub:"Swakopmund, Walvis Bay & Omaruru",image:"coast",intro:"Coastal towns, desert excursions and inland rock landscapes.",places:[
place("Walvis Bay Lagoon","Nature","A coastal wetland known for flamingos and other waterbirds. Bring binoculars and consider tide and wind conditions."),
place("Sandwich Harbour","Excursion","A dramatic meeting of dunes and Atlantic coastline south of Walvis Bay. Arrange access with an appropriate guided operator and confirm conditions."),
place("Spitzkoppe","Nature","Granite peaks and rock formations with camping and walking opportunities. Carry water, respect marked access and plan around daytime heat."),
place("Strand Hotel Swakopmund","Hotel","A seafront hotel near Swakopmund’s promenade. Check room availability, meal options and parking or transfer arrangements."),
place("The Tug","Restaurant","A coastal restaurant near Swakopmund’s jetty, often chosen for seafood and sea views. Confirm opening times and reserve in advance.")]},
{slug:"hardap",name:"Hardap",hub:"Mariental, Sesriem & Sossusvlei",image:"namibia",intro:"Desert scenery, dunes and a reservoir landscape near Mariental.",places:[
place("Sossusvlei","Nature","A dune-and-pan landscape reached through Sesriem in Namib-Naukluft National Park. Confirm park access, transport and gate times."),
place("Deadvlei","Nature","A pale clay pan with dark camelthorn trees framed by tall dunes. Expect a sandy walk and carry water and sun protection."),
place("Sesriem Canyon","Attraction","A compact canyon near the Sesriem entrance area. Check safe access and conditions, particularly after rain."),
place("Hardap Dam","Nature","A reservoir area near Mariental suited to a quiet stop and scenic exploration. Check current recreation and park access arrangements."),
place("Sossusvlei Lodge","Lodge","Accommodation near Sesriem that can serve as a base for early desert visits. Confirm meals, excursions and transfer needs separately.")]},
{slug:"karas",name:"ǁKaras",hub:"Keetmanshoop, Lüderitz & the far south",image:"coast",intro:"Canyon views, desert history and the southern Atlantic coast.",places:[
place("Fish River Canyon","Nature","One of southern Namibia’s major landscapes, with viewpoints and a regulated multi-day hiking route. Hiking requires specific preparation and permissions."),
place("Kolmanskop","Heritage","A former diamond settlement outside Lüderitz where sand-filled buildings tell a mining history. Confirm permits, guided visits and photography conditions."),
place("Quiver Tree Forest","Nature","A distinctive quiver tree landscape near Keetmanshoop. Respect access rules and plan photography around suitable light."),
place("Lüderitz Waterfront","Town visit","A starting point for exploring Lüderitz’s harbour and historic streets. Coastal weather can be cold and windy."),
place("Ai-Ais Hot Springs","Stay & nature","A southern canyon-area stop associated with hot springs and accommodation. Confirm facilities and opening status before including it in a route.")]},
{slug:"kunene",name:"Kunene",hub:"Damaraland, Opuwo & the north-west",image:"travel",intro:"Remote landscapes, rock art and the Kunene River.",places:[
place("Twyfelfontein","Heritage","A UNESCO-listed rock engraving landscape. Use the designated visitor arrangements and local guides; avoid touching rock art."),
place("Epupa Falls","Nature","Falls on the Kunene River near the Angolan border. River levels and road conditions vary; plan transport and accommodation carefully."),
place("Palmwag","Nature","A gateway to north-western landscapes and guided wildlife excursions. Confirm concession access and appropriate vehicle requirements."),
place("Grootberg Lodge","Lodge","A lodge above the Klip River valley, commonly used for guided Damaraland experiences. Verify access, activities and stay terms."),
place("Opuwo","Town visit","A service town and starting point for travel further north-west. Cultural visits should be arranged respectfully with consent and local guidance.")]},
{slug:"omusati",name:"Omusati",hub:"Outapi & Ruacana",image:"travel",intro:"Northern heritage, community life and river landscapes.",places:[
place("Ombalantu Baobab","Heritage","A prominent baobab landmark at Outapi with a long local history. Ask about guided access and the heritage centre."),
place("Ruacana Falls","Nature","Falls on the Kunene River whose appearance depends strongly on water flow. Check current conditions before travelling for a falls visit."),
place("Uukwaluudhi Royal Homestead","Heritage","A traditional royal homestead associated with northern history. Arrange a locally guided visit and respect access rules."),
place("Tsandi","Town visit","A useful base for visiting the surrounding Uukwaluudhi area. Confirm local guiding and accommodation in advance."),
place("Outapi","Town visit","A northern town with shops and local services, useful for resupply and learning about regional community life.")]},
{slug:"oshana",name:"Oshana",hub:"Oshakati, Ongwediva & Ondangwa",image:"stay",intro:"Connected northern towns and local market experiences.",places:[
place("Oshakati Open Market","Market","A place to browse local produce and everyday goods. Ask before photographing people and use a local guide if unfamiliar with the area."),
place("Ongwediva","Town visit","A northern town with accommodation, shopping and regional services. A practical base for appointments and local visits."),
place("Ondangwa","Town visit","A transport and commercial hub for northern travel. Confirm flight, road transfer and accommodation schedules independently."),
place("Oshakati","Town visit","A busy regional centre useful for supplies, meals and onward connections across the north."),
place("Ongwediva Annual Trade Fair","Event","A regional trade event rather than a year-round attraction. Confirm the published dates and venue before making travel plans.")]},
{slug:"ohangwena",name:"Ohangwena",hub:"Eenhana & Helao Nafidi",image:"travel",intro:"Northern heritage and towns along the Angolan border.",places:[
place("Eenhana Memorial Shrine","Heritage","A memorial site connected to Namibia’s liberation history. Confirm visitor access and consider a local guide for historical context."),
place("Eenhana","Town visit","A regional centre that can serve as a base for northern community and heritage visits."),
place("Helao Nafidi","Town visit","A cluster of border-area towns with commercial activity. Check travel documentation before crossing any international border."),
place("Oshikango","Town visit","A busy border settlement with markets and cross-border trade. Plan visits with awareness of local transport and border requirements."),
place("Engela","Town visit","A northern settlement with regional services, useful as part of a locally guided route rather than a standalone sightseeing promise.")]},
{slug:"oshikoto",name:"Oshikoto",hub:"Tsumeb, Omuthiya & eastern Etosha",image:"namibia",intro:"Wildlife routes and historic sites near Tsumeb.",places:[
place("Etosha National Park","Wildlife","The region offers access to eastern Etosha. Plan around your chosen gate, daylight driving and confirmed accommodation; sightings are never guaranteed."),
place("Lake Otjikoto","Nature","A deep sinkhole lake near Tsumeb with geological and historical interest. Check property access and visitor arrangements."),
place("Tsumeb Museum","Museum","A museum focused on regional mining, history and cultural material. Confirm opening hours before a town stop."),
place("Mokuti Etosha","Lodge","Accommodation near Etosha’s eastern access area. Check room rates, meals and game-drive arrangements."),
place("Onguma","Lodge & wildlife","A collection of accommodation and reserve experiences near eastern Etosha. Choose the specific property and verify its activities and access.")]},
{slug:"otjozondjupa",name:"Otjozondjupa",hub:"Otjiwarongo, Okahandja & Grootfontein",image:"travel",intro:"Plateau landscapes, conservation visits and central-northern routes.",places:[
place("Waterberg Plateau","Nature","A prominent plateau with park and accommodation options. Confirm trail access, guided activities and opening arrangements."),
place("Hoba Meteorite","Attraction","A major meteorite site near Grootfontein. Plan a short stop and confirm visitor hours and access fees."),
place("Cheetah Conservation Fund","Conservation","A conservation organisation near Otjiwarongo with visitor programmes. Book through its current visitor channels."),
place("Okahandja Craft Markets","Market","Markets known for woodcarving and craft stalls. Browse respectfully and ask about the origin and transport of items."),
place("Otjiwarongo","Town visit","A practical overnight and resupply town for routes toward Waterberg, conservation sites and Etosha.")]},
{slug:"omaheke",name:"Omaheke",hub:"Gobabis & the eastern Kalahari",image:"namibia",intro:"Open Kalahari landscapes and eastern travel routes.",places:[
place("Gobabis","Town visit","A main eastern service town with accommodation and supplies, useful for routes toward Botswana."),
place("Kalahari Landscapes","Nature","Sandy plains, open skies and farm-based stays characterise this area. Access is property-specific; arrange guided activities with your host."),
place("Harnas Wildlife Foundation","Conservation","A wildlife-focused property in the wider Gobabis area. Confirm current visitor programmes and accommodation directly."),
place("Sandune Game Lodge","Lodge","A lodge near Gobabis that can fit an eastern overnight itinerary. Confirm current facilities, activities and road access."),
place("Buitepos","Route stop","A border-area stop on the Trans-Kalahari route. Check border hours, vehicle paperwork and onward travel requirements.")]},
{slug:"kavango-east",name:"Kavango East",hub:"Rundu, Divundu & the Okavango River",image:"stay",intro:"River stays and wildlife areas around Divundu.",places:[
place("Mahango Core Area","Wildlife","A wildlife area within Bwabwata National Park near Divundu. Confirm permits and vehicle access and keep a respectful distance from wildlife."),
place("Popa Falls","Nature","River rapids near Divundu, with viewpoints and nearby stays. Use designated access and avoid unsafe river edges."),
place("Rundu","Town visit","A river town and service hub on the north-eastern route. Arrange local visits and onward transport through confirmed providers."),
place("Divava Okavango Resort","Lodge","A riverside accommodation option near Divundu. Confirm excursions, meals and transfer requirements."),
place("Ngepi Camp","Camp","A river-oriented stay near Divundu with varied accommodation styles. Confirm your room type, access road and planned activities.")]},
{slug:"kavango-west",name:"Kavango West",hub:"Nkurenkuru",image:"stay",intro:"Quieter river country and community visits along the Kavango.",places:[
place("Nkurenkuru","Town visit","The regional capital on the Kavango River. A base for local services and carefully arranged community visits."),
place("Kavango River near Nkurenkuru","Nature","A river landscape best explored through locally arranged access. Never assume water is safe for swimming; follow local guidance."),
place("Nkurunkuru Cultural Routes","Culture","Community and craft visits can offer local context when arranged with participating hosts. Ask permission for photography."),
place("Mpungu","Town visit","A settlement in the western part of the region that can be included in a locally planned inland route."),
place("Tondoro","Community visit","A settlement along the Kavango corridor. Arrange visits with local hosts rather than assuming public access to community spaces.")]},
{slug:"zambezi",name:"Zambezi",hub:"Katima Mulilo & river parks",image:"stay",intro:"River landscapes, wetlands and north-eastern wildlife routes.",places:[
place("Bwabwata National Park","Wildlife","A large park along the north-eastern corridor. Choose a specific visitor area and check permits and road conditions."),
place("Nkasa Rupara National Park","Wildlife","A wetland park where seasonal conditions can affect access. Confirm suitable vehicles and local guiding."),
place("Chobe River","Nature","A river landscape along Namibia’s north-eastern border, with boat and wildlife experiences through local operators."),
place("Zambezi Mubala Lodge","Lodge","A riverside stay outside Katima Mulilo. Confirm access transfers, excursions and meal inclusions."),
place("Katima Mulilo","Town visit","The region’s main service town and a starting point for river stays and neighbouring-country routes. Check border documentation separately.")]}
];
export function findRegion(slug:string){return regions.find(region=>region.slug===slug)}
