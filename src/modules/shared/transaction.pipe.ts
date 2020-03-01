import { Pipe, PipeTransform } from '@angular/core';
import { DineroPipe } from "./dinero.pipe";
import { Transaction,TransactionType } from "../../models/transaction";

@Pipe({
  name: 'transaction'
})
export class TransactionPipe implements PipeTransform {

  transform(transaction: Transaction, args?: any): any {
    var result = "";
    switch(transaction.type){
      case TransactionType.CREDIT:

      break;
      case TransactionType.DEBIT:
        result+="-";
      break;
    }
    result += transaction | DineroPipe;
    return result;
  }

}