import { FundService } from "../api/fund-service.i";
import { FundDetail } from "../api/fund-detail.m";
import { FundSummary } from "../api/fund-summary.m";
import { service } from "../api/reflect";

@service()
export class EastmoneyFundService implements FundService  {
    getGirl(): string {
        throw new Error("Method not implemented.");
    }
    getBoy(): string {
        throw new Error("Method not implemented.");
    }
    getBoyName(): string {
        throw new Error("Method not implemented.");
    }
    getBoyAge(): number {
        throw new Error("Method not implemented.");
    }
    updateFundDetail(): void {
        throw new Error("Method not implemented.");
    }
    getFund(): FundSummary {
        throw new Error("Method not implemented.");
    }
    public getFundDetail(code:number): FundDetail {
        return new FundDetail();
    }

    public getFundList(): FundSummary[] {
        return [];
    }

    private doGetFund():FundSummary{
        return null;
    }

    public test(){

    }
}