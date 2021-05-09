import { Component, OnInit } from '@angular/core';
import { PassingDataService } from '../passing-data.service';
import { LeadCardComponent } from '../lead-card/lead-card.component';
@Component({
  selector: 'app-lead-form',
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.css']
})
export class LeadFormComponent implements OnInit {
  public lead_name:string;
  public city:string;
  public lead_phone:string;
  public lead_address:string;
  public lead_type:string;
  public author_phone:string;
  public is_verified:string;
  public lead_description:string;
  public created:string;

  constructor( private passingData: PassingDataService, private leadcard:LeadCardComponent) {
    this.lead_name="";
    this.city="";
    this.lead_phone="";
    this.lead_address="";
    this.lead_type="";
    this.author_phone="";
    this.is_verified="";
    this.lead_description="";
    this.created="";
   }


  ngOnInit(): void {
  }

submit(){
this.passingData.lead_obj={
  "is_verified": this.is_verified,
    "author_name":"",
    "author_phone": this.author_phone,
    "lead_phone": this.lead_phone,
    "lead_name": this.lead_address,
    "lead_type": this.lead_type,
    "lead_description": this.lead_description,
    "city": this.city,
    "lead_address": this.lead_address,
    "created": this.created
    };
this.leadcard.leads.push(this.passingData.lead_obj);

console.log(this.leadcard.leads);
}

}