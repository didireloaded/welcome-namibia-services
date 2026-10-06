export type DiscoveryItem = { slug: string; name: string; location: string; category: string; description: string; image: string; region: string };
export const stays: DiscoveryItem[] = [
  { slug:"midgard", name:"Midgard", location:"Otjihavera · Central Namibia", category:"Country estate", description:"Nature, wellness, dining and family escapes near Windhoek.", image:"stay", region:"khomas" },
  { slug:"mokuti-etosha", name:"Mokuti Etosha", location:"Etosha East", category:"Safari lodge", description:"A comfortable base for exploring Etosha and its wildlife.", image:"stay", region:"oshikoto" },
  { slug:"strand-hotel", name:"Strand Hotel Swakopmund", location:"Swakopmund · Erongo", category:"Coastal hotel", description:"A seafront stay close to Swakopmund’s promenade and town life.", image:"coast", region:"erongo" },
  { slug:"desert-grace", name:"The Desert Grace", location:"Sossusvlei · Hardap", category:"Desert lodge", description:"A considered base for red dunes, wide skies and desert days.", image:"namibia", region:"hardap" },
  { slug:"okapuka", name:"Okapuka Safari Lodge", location:"Central Namibia", category:"Safari lodge", description:"A close-to-Windhoek starting point for a quieter wilderness stay.", image:"stay", region:"khomas" },
  { slug:"onguma-fort", name:"Onguma The Fort", location:"Etosha East", category:"Private reserve", description:"A distinctive Etosha-edge stay with a strong sense of place.", image:"travel", region:"oshikoto" },
];
export const attractions: DiscoveryItem[] = [
  { slug:"sossusvlei", name:"Sossusvlei", location:"Namib Desert · Hardap", category:"Natural wonder", description:"Towering red dunes and pale clay pans in an iconic desert landscape.", image:"namibia", region:"hardap" },
  { slug:"etosha", name:"Etosha National Park", location:"Northern Namibia", category:"Wildlife", description:"A vast salt pan and wildlife destination shaped by water and season.", image:"travel", region:"oshikoto" },
  { slug:"deadvlei", name:"Deadvlei", location:"Sossusvlei · Hardap", category:"Nature", description:"Dark camelthorn trees set against a white pan and tall dunes.", image:"namibia", region:"hardap" },
  { slug:"fish-river-canyon", name:"Fish River Canyon", location:"ǁKaras", category:"Landscape", description:"Southern Namibia’s dramatic canyon country and open horizons.", image:"coast", region:"karas" },
  { slug:"spitzkoppe", name:"Spitzkoppe", location:"Erongo", category:"Mountains", description:"Granite peaks, rock formations and wide-open desert light.", image:"travel", region:"erongo" },
  { slug:"sandwich-harbour", name:"Sandwich Harbour", location:"Walvis Bay · Erongo", category:"Adventure", description:"Where giant dunes meet the Atlantic Ocean south of Walvis Bay.", image:"coast", region:"erongo" },
];
export const experiences = ["Safari", "Desert adventures", "Coast & marine life", "Culture & heritage", "Road trips", "Photography", "Family Namibia", "Wellness"];
