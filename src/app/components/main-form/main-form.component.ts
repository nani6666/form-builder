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
  totalField:any;
  maxcharfield:any;
  childData:any;
  genderMale:boolean;
  genderFemale:boolean;
  genderOthers:boolean;
  maxcharVal:any;
  maxCharValErrors:boolean;
  genderCapture:any;
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
  enabledmulticheck:boolean = true;
  maleInput:boolean = true;
  femaleInput:boolean = false;
  othersInput:boolean = false;
  cmcfinpt:boolean = false;
  totalinput:boolean = false;


  constructor(private _fb: FormBuilder,private serviceCall:ApiCallsService) { }

  ngOnInit() {
    this.inputbtn = false;
    this.currencyApi();
    this.builderForm = this._fb.group({
      builderInput: this._fb.array([''])
    });
    // console.log(this.serviceCall.getAllCurrencies());

    if(this.inputType === undefined){
       this.divFields = false;
    }else{
      this.divFields = true;
    }
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
    if(labelvalue < 1 || labelvalue > 10){
      this.maxCharValErrors = true
    }else {
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

    }else if(val == "child"){
     if(this.childData == "Yes"){
       this.cmcfinpt = true ;
     }else if(this.childData == "No"){
      this.cmcfinpt = false ;
     }
    }else if(val == "total"){
      if(this.totalField == "Yes"){
        this.totalinput = true ;
      }else if(this.totalField == "No"){
       this.totalinput = false ;
      }
    }else if(val == "genderCapt"){
      if(this.genderCapture == "Yes"){
        this.showGenderChecks = true;
        this.genderMale = true;
      }else{
        this.showGenderChecks = false;
        this.genderMale = false;
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
  }else if(val == "Male"){
    if( this.genderMale == true){
      this.maleInput = true;
    }else{
      this.maleInput = false;
    }
  } else if(val == "female"){
    if( this.genderFemale == true){
      this.femaleInput = true;
    }else{
      this.femaleInput = false;
    }
  }else if(val == "others"){
    if( this.genderOthers == true){
      this.othersInput = true;
    }else{
      this.othersInput = false;
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
