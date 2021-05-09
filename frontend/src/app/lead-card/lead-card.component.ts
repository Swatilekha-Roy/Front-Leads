import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lead-card',
  templateUrl: './lead-card.component.html',
  styleUrls: ['./lead-card.component.css']
})
export class LeadCardComponent implements OnInit, OnChanges {
  leads: any;
 obj:any;
  constructor() { 
    this.obj={ "is_verified": "verified",
    "author_name": "Swati" ,
    "author_phone": "8111111111",
    "lead_phone": "722222222",
    "lead_name": "ABC Grounds",
    "lead_type": "oxygen cylinder",
    "lead_description": "Oxygen cylinders",
    "city": "chennai",
    "lead_address": "Near Champak road, Chennai",
    "created": "6:53PM, 9 May,2021"
    };
    this.leads=[this.obj];
  }
  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
    console.log('Hi');
    this.leads=[this.obj];
  }

  ngOnInit(): void {

    let obj1={ "is_verified": "not_verified",
    "author_name": "Sasha" ,
    "author_phone": "8111112311",
    "lead_phone": "7222241222",
    "lead_name": "Hiranandani Hospital",
    "lead_type": "plasma_donor",
    "lead_description": "Plasma donor available of covid recovered 20 year old patient, A+ blood group.",
    "city": "mumbai",
    "lead_address": "Dadar(West)- 400802",
    "created": "8:53PM, 8 May,2021"
    };
    this.leads.push(obj1);


    let obj2={ "is_verified": "verified",
    "author_name": "Venkatesh" ,
    "author_phone": "8111112311",
    "lead_phone": "7212241222",
    "lead_name": "Apollo Hospital",
    "lead_type": "oxygen",
    "lead_description": "Oxygen cylinders are available.",
    "city": "chennai",
    "lead_address": "Dadar(West)- 400802",
    "created": "8:53PM, 8 May,2021"
    };
    this.leads.push(obj2);

    let obj3={ "is_verified": "verified",
    "author_name": "Ananya" ,
    "author_phone": "8111112311",
    "lead_phone": "7222241572",
    "lead_name": "Ruby Hospital",
    "lead_type": "plasma_donor",
    "lead_description": "Plasma donor available of covid recovered 35 year old patient, O+ blood group.",
    "city": "kolkata",
    "lead_address": "kasba- 710802",
    "created": "8:20PM, 7 May,2021"
    };
    this.leads.push(obj3);

  }

}
