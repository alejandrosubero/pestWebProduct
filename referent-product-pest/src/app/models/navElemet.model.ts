export class navConfig {
    
    title:string;
    label:string;
    sds:string;
    favorite:Favorite;
    goto:string;
    noteSource:string;
    hideNemu: boolean;

    constructor(){
        this.title ="";
        this.label= "";
        this.sds ="";
        this.favorite = new Favorite();
        this.goto ="";
        this.noteSource ="";
        this.hideNemu =false;
    }

}

export class Favorite {
    active:boolean;
    url:string;

    constructor(){
        this.active = false;
        this.url ="";
    }

}