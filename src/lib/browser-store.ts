import { exampleCases, type ApplicationRecord } from "./example-data";
import type { SavedRequest } from "./request-schema";

const REQUESTS="arrival-browser-requests-v1";
const SETTINGS="arrival-browser-workspace-v1";
const REFERENCE="arrival-browser-reference";
const MESSAGES="arrival-browser-messages-v1";
const allowedStatuses=["Submitted","Under review","Documents needed","Submitted to authority","Decision recorded","Confirmed"];
type Workspace={driver:string;document:string};
const initialWorkspace:Workspace={driver:"Not assigned",document:"Awaiting review"};

function read<T>(key:string,fallback:T):T{
 if(typeof window==="undefined")return fallback;
 try{const value=window.localStorage.getItem(key);return value?JSON.parse(value) as T:fallback;}catch{return fallback;}
}
function write(key:string,value:unknown){
 if(typeof window==="undefined")return;
 try{window.localStorage.setItem(key,JSON.stringify(value));window.dispatchEvent(new Event("arrival-browser-change"));}catch{throw new Error("This browser could not save these browser records. Free some browser storage and try again.");}
}
export function snapshot(){
 const records=read<ApplicationRecord[]|null>(REQUESTS,null) ?? exampleCases;
 const workspace=read<Workspace>(SETTINGS,initialWorkspace);
 return {records,workspace};
}
export type JourneyMessage={id:string;requestId:string;author:"traveller"|"agency";text:string;at:string};
export function messagesFor(requestId:string){return read<JourneyMessage[]>(MESSAGES,[]).filter(message=>message.requestId===requestId);}
export function addJourneyMessage(requestId:string,text:string,author:JourneyMessage["author"]="traveller"){
 const safe=text.trim();if(!safe||safe.length>1200)throw new Error("Enter a message under 1,200 characters.");
 const {records}=snapshot();if(!records.some(record=>record.id===requestId))throw new Error("Request not found.");
 const all=read<JourneyMessage[]>(MESSAGES,[]);const message={id:`msg-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,requestId,author,text:safe,at:new Date().toISOString()};write(MESSAGES,[...all,message]);return message;
}
export function notificationPreferences(){return read<{email:boolean;whatsapp:boolean;sms:boolean}>("arrival-browser-notification-preferences-v1",{email:true,whatsapp:false,sms:false});}
export function saveNotificationPreferences(value:{email:boolean;whatsapp:boolean;sms:boolean}){write("arrival-browser-notification-preferences-v1",value);}
export function subscribe(listener:()=>void){
 if(typeof window==="undefined")return()=>{};
 window.addEventListener("storage",listener);window.addEventListener("arrival-browser-change",listener);
 return()=>{window.removeEventListener("storage",listener);window.removeEventListener("arrival-browser-change",listener);};
}
export function currentReference(){return typeof window==="undefined"?"":window.localStorage.getItem(REFERENCE)||"";}
export function createLocalRequest(input:SavedRequest){
 const {passport:_discardedPassport,...safeDetails}=input.details;
 const {records}=snapshot();
 const number=records.filter(record=>record.id.startsWith("WN-REF-")).length+1;
 const now=new Date().toISOString();
 const labels={visa:`${input.purpose} visa & permit support`,transfers:"Airport transfer enquiry",medical:"Medical visit coordination",vacations:"Stay & vacation enquiry",esim:"Travel connectivity enquiry"};
 const record:ApplicationRecord={id:`WN-REF-${new Date().getFullYear()}-${String(number).padStart(4,"0")}`,client:input.personal.name,service:labels[input.service],date:new Date(now).toLocaleDateString("en-GB"),status:"Submitted",amount:0,createdAt:now,updatedAt:now,events:[{status:"Submitted",at:now}],enquiry:{...input,details:safeDetails}};
 write(REQUESTS,[record,...records]);window.localStorage.setItem(REFERENCE,record.id);return record;
}
export function updateLocalStatus(id:string,status:string){
 if(!allowedStatuses.includes(status))throw new Error("Choose a listed status.");
 const {records}=snapshot();let found=false;const at=new Date().toISOString();
 const next=records.map(record=>{if(record.id!==id)return record;found=true;return {...record,status,updatedAt:at,events:[...(record.events||[]),{status,at}]};});
 if(!found)throw new Error("Request not found.");write(REQUESTS,next);return next.find(record=>record.id===id)!;
}
export function updateLocalWorkspace(key:keyof Workspace,value:string){
 const workspace=snapshot().workspace;
 const choices:Record<keyof Workspace,string[]>={driver:["Not assigned","Example driver A · example vehicle","Example driver B · example vehicle"],document:["Awaiting review","Verified","Needs correction"]};
 if(!choices[key].includes(value))throw new Error("Choose a listed option.");
 write(SETTINGS,{...workspace,[key]:value});
}
