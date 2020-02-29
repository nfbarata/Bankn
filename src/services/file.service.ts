import { Injectable } from '@angular/core';
import { Account } from "../models/account";

@Injectable({providedIn: 'root'})
export class FileService {

  fileToUpload: File = null;
  fileType:String = 'application/json';

  constructor() { }

  parseJsonFile(callback){
    var output:String = "";
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
      //Only plain text
      if (!this.fileToUpload.type.match(this.fileType)){
        alert("Invalid file formar");//i18n
      }else{
        var picReader = new FileReader();

        picReader.addEventListener("load", function(event) {
            var textFile = event.target;
            console.log(textFile.result);
            var object = JSON.parse(textFile.result);
            callback(object);
        });

        //Read the text file
        picReader.readAsText(this.fileToUpload);
      }
    } else {
      alert('The File APIs are not fully supported in this browser.');//i18n
    }
  }

  downloadJsonFile(object:Object, filename='bankn.json'){
    var output = JSON.stringify(object);
    let blob = new Blob(['\ufeff' + output], { type: this.fileType+';charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename);
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }
/*
  downloadFile(data, headerList, filename='data') : void {
    let csvData = this.convertToCSV(data, headerList);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  convertToCSV(objArray, headerList) : String {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';

    for (let index in headerList) {
        row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
        let line = (i+1)+'';
        for (let index in headerList) {
          let head = headerList[index];

            line += ',' + array[i][head];
        }
        str += line + '\r\n';
    }
    return str;
  }
  */
}