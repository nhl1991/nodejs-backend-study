import { client } from "@/mongo/mongo";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    const userId = await request.json()

    try {
        await client.connect();

        const collection = client.db('test').collection('person');
        const isValid = await collection.findOne({ id: userId })

        if (!isValid)
            return NextResponse.json({ "isValid": true, "message": "사용 가능한 아이디입니다." })
        else
            return NextResponse.json({ "isValid": false, "message": "이미 가입된 아이디입니다." })
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }

    return NextResponse.json({ message: 'success' })
}