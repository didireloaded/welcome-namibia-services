export type PreparedRequest={reference:string;createdAt:string;name:string;summary:string};
const key="welcome-namibia-prepared-requests-v1";
export function requests():PreparedRequest[]{try{const value=JSON.parse(localStorage.getItem(key)||"[]");return Array.isArray(value)?value.filter(item=>item && typeof item.reference==="string" && typeof item.summary==="string" && typeof item.name==="string" && typeof item.createdAt==="string" && Number.isFinite(Date.parse(item.createdAt))):[]}catch{return []}}
export function saveRequest(name:string,summary:string):PreparedRequest{const record={reference:"WN-"+crypto.randomUUID().slice(0,8).toUpperCase(),createdAt:new Date().toISOString(),name,summary};localStorage.setItem(key,JSON.stringify([record,...requests()]));return record}
