import { client } from "@/mongo/mongo";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
    const data = request.formData();
    const userId = (await data).get('userid') as string;
    const userPassword = (await data).get('password') as string;
    if(!userId || !userPassword) return NextResponse.json({message: 'Validation Error.'});

    validatePassword(userId, userPassword)
    try {

    }catch(err){
        console.log(err);
    }
}

async function validatePassword(userId:string, password: string){

    try{
        await client.connect();
        const collection = client.db('test').collection('person');
        const user = await collection.findOne({where: userId});
        console.log(user);
        
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }

}