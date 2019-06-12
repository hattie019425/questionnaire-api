import { FundSummary } from "./fund-summary.m";
import { FundDetail } from "./fund-detail.m";

//path /api/fund
export interface FundService {
    // api/fund/detail - Get
    getFundDetail(code:number, name:string): FundDetail;

    // api/fund/list - Get
    getFundList(): FundSummary[];
    
    getGirl():string

    getBoy():string

    getBoyName():string

    getBoyAge(): number
    
    // api/fund/detail - Put
    updateFundDetail():void
}