import { User } from "../user.model";

export class IProductII {
    id?: number;
    name: string;
    date_in: Date;
    type: string;
    code: string;
    active: boolean;
    currentCuantity: number;
    costByBatchs = new Map<string, Batch>();
    recivedProduct: Array<In_Product>;
    usedProduct: Array<Out_Product>;
    package:Package;


    constructor() {
        this.date_in = new Date();
        this.name = '';
        this.type = '';
        this.code = '';
        this.active = true;
        this.currentCuantity = 0;
        this.recivedProduct = new Array<In_Product>();
        this.usedProduct = new Array<Out_Product>();
        this.package = new Package();

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
    id?: number;
    batch: string;
    batchCode: string;
    cost: number;
    price: number;
    porcentual: number;
    cuantity: number;
    date_in_create: Date;
    isAudit: boolean;
    audidCode: string;
    active: boolean;
    level: number;

    constructor() {
        this.batch = '';
        this.batchCode = '';
        this.cost = 0;
        this.price = 0;
        this.porcentual = 0;
        this.cuantity = 0;
        this.date_in_create = new Date();
        this.isAudit = false;
        this.audidCode = '';
        this.level = 0;
        this.active = true;
    }

    updateCurrentCuantity(newCuantity: number): boolean {
        if (newCuantity != null && newCuantity != undefined && newCuantity != 0) {
            this.cuantity = newCuantity
            return true;
        } else {
            return false;
        }
    }

    setAuditParameters(audit: boolean, code: string): boolean {
        if (audit && (code != null && code != undefined && code != '')) {
            this.isAudit = true;
            this.audidCode = code;
            return true;
        } else {
            return false;
        }
    }

}


export class In_Product {
    id?: number;
    cuantity: number;
    type: string;
    batch: Batch;
    user: User;
    date_in: Date;
    isAudit: boolean;
    audidCode: string;

    constructor() {
        this.cuantity = 0;
        this.type = '';
        this.batch = new Batch();
        this.user = new User();
        this.date_in = new Date();
        this.isAudit = false;
        this.audidCode = '';
    }

}



export class Out_Product {

    id?: number;
    cuantity: number;
    type: string;
    batch: Batch;
    user: User;
    date_out: Date;
    isAudit: boolean;
    audidCode: string;
    destination: string;

    constructor() {

        this.cuantity = 0;
        this.type = '';
        this.batch = new Batch();
        this.user = new User();
        this.date_out = new Date();
        this.isAudit = false;
        this.audidCode = '';
        this.destination = '';

    }
}

export class Package{

    id?:number;
    code:string;
    type:string;
    unit:string;
    cuantity:number;

    constructor(){
        this.code ='';
        this.type ='';
        this.unit='';
        this.cuantity = 0 ;
    }

}

export class Audit{

    id?:number;
    code:string;
    type:string;
    foundfindings:string;
    user: User;
    date_in: Date;
    active: boolean;
    section: Array<AuditSection>;

    constructor(){
        this.code = '';
        this.type ='';
        this.foundfindings = '';
        this.user = new User();
        this.date_in = new Date();
        this.active = true;
        this.section = new Array<AuditSection>();
    }

}


// TODO: EN ESTE OBJETO DEBE DE HABER UNA FUNCION QUE CALCULE LOS COSTO AL COMPARAR LO DEL SISTEMA Y LO CONTADO
// LOS COSTOS ESTAN EN LOS BATCH, Y TENEMOS EL COSTO DEL PRODUCTO Y EL PRECIO DE VENTA SE DEBE DE HACER UNA PROYECCION DE LO QUE SE PIERDE O SE TIENE A FAVOR?


export class AuditSection {

    id?:number;
    AuditSectionCode:string;
    batchCode:string;
    batchName:string;
    findingsNote:string;
    cuantityInSystem:number;
    cuantityCount:number;
    diference: number;

    user: User;
    date_AuditSection: Date;
    
     constructor() {
       this.user = new User();
       this.date_AuditSection = new Date();
       this.AuditSectionCode ='';
       this.batchCode='';
       this.batchName ='';
       this.findingsNote='';
       this.cuantityCount =0;
       this.cuantityInSystem = 0;
       this.diference = 0;
    }

    updateBatch(oneBatch: Batch) {
        if (oneBatch !== null && oneBatch !== undefined && (oneBatch.batchCode != '' && oneBatch.batch !== '')) {
            this.batchCode = oneBatch.batchCode;
            this.batchName = oneBatch.batch;
            
        }

}


}