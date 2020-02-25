import { Component, OnInit } from '@angular/core';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  //fileToUpload: File = null;
  
  constructor(
     private fileService: FileService
  ) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileService.fileToUpload = files.item(0);
  }
}