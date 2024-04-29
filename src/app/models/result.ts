export class Result{
    constructor(
        //public _id: string,
        public state:string,
        public tournament:string,
        public date:string,
        public hour:string,
        public stadium_name:string,
        //public stadium_address:string,
        //public stadium_lat:string,
        //public stadium_long:string,
        public local_team:string,
        public visiting_team:string
    ){}
}