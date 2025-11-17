import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


// 타입 생성
export type BlogDocument = Blog & Document;

@Schema() // 스키마 생성 데코레이터
export class Blog{
    @Prop() // 모델의 프로퍼티 매개변수로 option 설정
    id: string;

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    name: string;

    @Prop()
    createdDt: Date;

    @Prop()
    updatedDt: Date;
}


// 스키마 생성. mongoose 내부적으로 new Schema를 사용
export const BlogSchema = SchemaFactory.createForClass(Blog);