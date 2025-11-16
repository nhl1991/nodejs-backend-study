// 몽구스 스키마 생성

let mongoose = require("mongoose");
let { Schema } = mongoose;


// mongoose.schema 인스턴스로 스키마 생성
const personSchema = new Schema({
  name: String,
  age: Number,
  crew: String
},{
  collection: 'person' // 지정 안하면 Mongoose가 자동으로 컬렉션 이름을 복수형으로 생성해버림.
});

/**
 * 스키마 타입
 * String, 
 * Number, 
 * Date, 
 * Buffer, 
 * Boolean, 
 * Mixed, 
 * ObjectId, 
 * Array, 
 * Decimal128, 
 * Map, 
 * Schema
 */


module.exports = mongoose.model('person', personSchema)

/**
 * 스키마속성  | 타입
 * require  | boolean 또는 function,
 * default  | ,
 * select   |,
 * validate |,
 * get      |,
 * set      |,
 * alias    |,
 * immutable|,
 * transform| 
 * index,
 * unique,
 * sparse,
 */