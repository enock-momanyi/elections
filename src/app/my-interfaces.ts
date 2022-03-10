
export interface MyInterfaces {

}

export interface CountyInt{
    id:number,
    name:String,
    constituency: Parl[]
}
export interface Parl{
    id:number,
    name:String,
    countId:number,
    candidates: Candidate[]
}
export interface Candidate{
    id:number,
    firstname: String,
    middlename: String,
    lastname: String,
    alias: String,
    bio:String,
    photo:String,
    party: String,
    position: String,
    deputy: String,
    countyId: number,
    constituencyId: number,
    userId: number,
    user: User
}
export interface UserData{
    username: String,
    firstname: String,
    middlename: String,
    lastname: String,
    alias: String,
    email: String,
    party: String,
    position: String,
    deputy: String,
    countyId: number,
    constituencyId: number,
    password: String,
    file: any,
    bio:String
}
export interface User{
    id: number,
    username: String,
    email: String,
    candidates: Candidate

}
export interface Profile{
    id:number,
    bio: String,
    photo:String
}
