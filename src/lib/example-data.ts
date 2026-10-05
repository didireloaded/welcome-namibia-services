import type { SavedRequest } from "./request-schema";
export type ApplicationRecord = {
  id:string;client:string;service:string;date:string;status:string;amount:number;
  createdAt?:string;updatedAt?:string;events?:{status:string;at:string}[];enquiry?:SavedRequest;
};
export const exampleCases:ApplicationRecord[]=[
 {id:"EXAMPLE-AN-001",client:"Selma Amutenya · example",service:"Study visa & permit support",date:"12 Jan 2027",status:"Under review",amount:0,events:[{status:"Submitted",at:"2027-01-12T08:00:00.000Z"},{status:"Under review",at:"2027-01-12T10:00:00.000Z"}]},
 {id:"EXAMPLE-AN-002",client:"Tjiuuke Nangolo · example",service:"Work visa & permit support",date:"13 Jan 2027",status:"Documents needed",amount:0,events:[{status:"Submitted",at:"2027-01-13T08:00:00.000Z"},{status:"Documents needed",at:"2027-01-13T10:00:00.000Z"}]},
 {id:"EXAMPLE-AN-003",client:"Kavee Mupupa · example",service:"Airport transfer enquiry",date:"14 Jan 2027",status:"Confirmed",amount:0,events:[{status:"Submitted",at:"2027-01-14T08:00:00.000Z"},{status:"Confirmed",at:"2027-01-14T10:00:00.000Z"}]}
];
