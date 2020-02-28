import { Dinero } from 'dinero.js';
import  { Account } from "./account";

export class Bankn {
  name:String;
  accounts : Account[] = [];
  referenceCountry:String;
}