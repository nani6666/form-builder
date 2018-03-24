import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit {
  inputbtn:any;
  textareabtn:any;
  fieldLabel:any;


  constructor() { }

  ngOnInit() {
    this.inputbtn = false;
    this.textareabtn = false;
  }

  elementClick(val){
    if(val == "input"){
      this.inputbtn = true;
      this.textareabtn = false;
    }else{
      this.inputbtn = false;
      this.textareabtn = true;
    }
  }

  onlabel(labelvalue: string ) {
   // console.log(searchValue);
   this.fieldLabel = labelvalue ;
  }

}
