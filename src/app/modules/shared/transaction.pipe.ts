import { Pipe, PipeTransform } from '@angular/core';
import { DineroPipe } from "./dinero.pipe";
import { Transaction } from "../../models/transaction";
import { TransactionType } from 'src/app/models/enums';

@Pipe({
  name: 'transaction'
})
export class TransactionPipe implements PipeTransform {

  constructor(
    private dinero:DineroPipe
  ){

  }

  transform(transaction: Transaction, args?: any): any {
    var amount = transaction.amount;
    var result = "";
    switch(transaction.type){
      case TransactionType.CREDIT:
      break;
      case TransactionType.DEBIT:
        if(amount.toUnit()!=0)
          result=result+"-";
      break;
    }
    result = result + this.dinero.transform(amount);
    return result;
  }

}