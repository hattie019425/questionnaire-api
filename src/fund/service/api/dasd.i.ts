import { FundSummary } from "./fund-summary.m";
import { FundDetail } from "./fund-detail.m";

export interface FundService {
    as(code:number): FundDetail;

    getFundList(): FundSummary[];

}