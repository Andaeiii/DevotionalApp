//each department has this properties...

export interface IDept{
    id:number;
    church_id:number;
    unit_name:string;
    description:string
};

export interface IReading{
    id:number;
    topic:string;
    date:string;
    imagefile:string;
    scripture:string;
    speaker:string;
    body:string;
    excerpt: number;
    declaration:string;
    prayer:string;
    yearlyplan:string;
    bibleplan:string
};

export interface IReadingObj{
    id:number;
    topic:string;
    date:string;
    speaker:string;
    excerpt: number;
};

export interface IUser{
    id:number;
    church_id:number;
    email:string;
    authcode:string;
    fullname:string;
    phone: number;
    skills: string;
};
   
export interface IStatus{
    status_msg:string;
};

export interface IChurchObj{
    progs:any;  
    all:any;
    events:any;
};

export interface IServiceObj{
    title:string;
    day:string;
    start:string;
    finish:string;
};

export interface IEventObj{
    title:string;
    date:string;
    time:string;
    days:number;
    img:string;
    info:string;
};

export interface IOrder{
    channel:string;
    starts:string;
    ends:string;
    daysleft:number;
    p_amount:number;
    p_date:string;
    dv_price:string;
    plan:string;
    period:string;
    status:string;
};

export interface IRequestObj{
    id:number,
    qstn:string;
    ans:string;
    seen:boolean;
    q_date:any;
    a_date:any;
}