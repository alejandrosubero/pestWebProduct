import { User } from "../user.model";

export class IProductII {

    name: string;
    date_in: Date;
    type: string;
    code: string;
    active: boolean;
    currentCuantity: number;
    costByBatchs = new Map<string, Batch>();
    recivedProduct: Array<In_Product>;
    

    constructor() {
        this.date_in = new Date();
        this.name = '';
        this.type = '';
        this.code = '';
        this.active = true;
        this.currentCuantity = 0;
        this.recivedProduct = new Array<In_Product>();

    }


    addBatch(newBatch: Batch): boolean {
        try {
            if (newBatch != undefined && newBatch != null) {
                this.costByBatchs.set(newBatch.batchCode, newBatch);
                return true;
            }
        } catch (error) {
            console.log('Error to save a Batch', error);
             return false;
        }
        return false;
    }


    findCostByLevel(level: number): any {
        for (let [key, value] of this.costByBatchs) {
            if (value.level == level) {
                return value;
            }
            return null;
        }
    }

    findCostByBatchCode(code: string): any {
        for (let [key, value] of this.costByBatchs) {
            if (value.batchCode == code) {
                return value;
            }
            return null;
        }
    }

    findBatchCByName(name: string): any {
        for (let [key, value] of this.costByBatchs) {
            if (value.batch == name) {
                return value;
            }
            return null;
        }
    }
    

} 


export class Batch {

    batch:string;
    batchCode:string;
    cost:number;
    price:number;
    porcentual:number;
    cuantity:number;
    date_in_create:Date;
    isAudit: boolean;
    audidCode:string;
    active: boolean;
    level:number;

    constructor(){
        this.batch ='';
        this.batchCode = '';
        this.cost = 0;
        this.price =0;
        this.porcentual = 0;
        this.cuantity = 0;
        this.date_in_create = new Date();
        this.isAudit = false;
        this.audidCode = '';
        this.level=0;
        this.active=true;
    }

    udateCurrentCuantity(newCuantity: number): boolean {
        if( newCuantity != null && newCuantity != undefined && newCuantity != 0){
            this.cuantity = newCuantity
            return true;
        }else{
            return false;
        }
    }

    setAuditParameters( audit: boolean, code:string): boolean{
        if(audit && (code != null && code != undefined && code != '')){
             this.isAudit = true;
            this.audidCode = code;
            return true;
        }else{
            return false;
        }
    }

}


export class In_Product{

    cuantity:number;
    type: string;
    batch: Batch;
    user: User;
    
    date_in: Date;
    
    isAudit: boolean;
    audidCode:string;

    constructor(){
        this.cuantity = 0;
        this.type = '';
        this.batch = new Batch();
        this.user = new User();
        this.date_in = new Date();
        this.isAudit = false;
        this.audidCode ='';
    }


}