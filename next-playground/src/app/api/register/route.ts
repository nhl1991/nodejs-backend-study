import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcrypt"
import { client } from "@/mongo/mongo";

export async function POST(request: NextRequest, response: NextResponse) {
    const data = request.formData();
    const userId = (await data).get('userid') as string;
    const password = (await data).get('password') as string;

    const salt = await genSalt(10);
    const encryptedPassword = await hash(password, salt);

    if (!userId || !password) return NextResponse.json({message: 'No userId or Password'});
    try {
        await client.connect();
        const collection = client.db('test').collection('person');
            await collection.insertOne({ id: userId, password: encryptedPassword });
        
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }

    return NextResponse.json({})
}
