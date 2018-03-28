import { ApiCallsService } from './../../services/api-calls.service';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit {
  inputbtn:any;
  fieldLabel:any;
  builderForm:FormGroup;
  public invoiceForm: FormGroup;
  totalField:boolean =false;
  maxcharfield:any;
  childData:boolean =false;
  genderMale:boolean;
  genderFemale:boolean;
  genderOthers:boolean;
  maxcharVal:any;
  maxCharValErrors:boolean;
  genderCapture:boolean =false;
  genderOhercapure:boolean =false;
  divFields:boolean =false;
  dropdowndiv:boolean = false;
  currencyDropdown:boolean = false;
  inputType:any;
  showGenderChecks:boolean = false;
  previewInputType:any;
  previewInpField:boolean = false;
  previewTextField:boolean = false;
  currencyData :any;
  multiLineField:boolean = false;
  textareafield:boolean = false;
  enabledmulticheck:boolean = false;
  maleInput:boolean = false;
  femaleInput:boolean = false;
  othersInput:boolean = false;
  cmcfinpt:boolean = false;
  totalinput:boolean = true;


  constructor(private _fb: FormBuilder,private serviceCall:ApiCallsService) { }

  ngOnInit() {
    this.inputbtn = false;
    this.divFields = true;
    this.inputType = "text";
    this.currencyApi();
    this.builderForm = this._fb.group({
      builderInput: this._fb.array([''])
    });
    this.invoiceForm = this._fb.group({
      itemRows: this._fb.array([this.initItemRows()])
    });
    // console.log(this.serviceCall.getAllCurrencies());

    if(this.inputType === undefined){
       this.divFields = false;
    }else{
      this.divFields = true;
    }
  }

  initItemRows() {
    return this._fb.group({
        maleinputval: [''],
        femaleinputval:  [''],
        othersinputval: [''],
        cminputval: [''],
        cfinputval: [''],
        totalinputval: [''],

    });
}

addNewRow() {
  // console.log(this._fb.array);
   const control = <FormArray>this.invoiceForm.controls['itemRows'];
   control.push(this.initItemRows());
}
deleteRow(index: number) {
  const control = <FormArray>this.invoiceForm.controls['itemRows'];
  control.removeAt(index);
}

  elementClick(val){
    if(val == "input"){
      this.inputbtn = true;
      this.previewInpField = true;
      this.previewTextField = false;

    }else{
      this.inputbtn = true;
      this.previewInpField = false;
      this.previewTextField = true;
      this.builderForm[0].reset();
    }
  }

  onlabel(labelvalue: any ,elem2 ) {
    if(elem2 == 'label'){
      this.fieldLabel = labelvalue ;
    }else if(elem2 == 'chars'){
      console.log(labelvalue);
     if(labelvalue == ""){
      this.maxCharValErrors = false;
      }else if(labelvalue < 1 || labelvalue > 10){
      this.maxCharValErrors = true
      }else{
      this.maxCharValErrors = false;
     }

    }

  }

  radiovalues(val){
    // alert(val);
    if(val == "typeInput"){
      if(this.inputType == "text"){
        this.divFields = true;
        this.previewInputType = this.inputType;
        this.currencyDropdown =  false;
        this. dropdowndiv  = false;
        this.multiLineField = false;
        this.enabledmulticheck = false;
        this.textareafield = false;
        this.checkboxesChange(this.multiLineField);
      } else if(this.inputType == "number"){
        this.divFields = true;
        this.previewInputType = this.inputType;
        this.currencyDropdown =  false;
        this. dropdowndiv  = false;
        this.multiLineField = false;
        this.enabledmulticheck = true;
        this.textareafield = false;
      }else if(this.inputType == "Currency"){
        this.divFields = false;
        // this.inputType = "text";
        this.currencyDropdown =  true;
        this.dropdowndiv  = true;
        this.multiLineField = false;
        this.enabledmulticheck = true;
        this.textareafield = false;
      }

    }

  }

  //api for currencies
  currencyApi(){
    this.serviceCall.getAllCurrencies().subscribe(data => {
      // console.log((<any>data)._body);
      this.currencyData = JSON.parse((<any>data)._body);
     });
  }

  checkboxesChange(val){
  if(val == "multilinefield"){
    this.checkvaluesTextfield();
  }else if(val == "genderdata"){
    if(this.genderCapture == true){
      this.maleInput = true;
      this.femaleInput = true;
      document.getElementById("pointerAdd").style.pointerEvents = "auto";
    }else{
      this.maleInput = false;
      this.femaleInput = false;
      document.getElementById("pointerAdd").style.pointerEvents = "none";
    }
  } else if(val == "othersData"){
    if( this.genderOhercapure == true){
      this.othersInput = true;
    }else{
      this.othersInput = false;
    }
  }else if(val == "childdata"){
    if( this.childData == true){
      this.cmcfinpt = true ;
    }else{
      this.cmcfinpt = false ;
    }
   }else if(val == "totalData"){
    if( this.totalField == true){
      this.totalinput = true ;
    }else{
      this.totalinput =  false ;
    }
   }
  }


  formsreset(){
    this.builderForm.get[0].reset();
  }
  checkvaluesTextfield(){
    if(this.multiLineField == true){
      this.dropdowndiv = false;
      this.divFields = false;
      this.textareafield = true;
    }else{
      this.dropdowndiv = false;
      this.divFields = true;
      this.textareafield = false;
    }
  }

}
