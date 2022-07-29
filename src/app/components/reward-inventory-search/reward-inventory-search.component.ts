import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { CustomInputSelectFilterComponent } from '../custom-input-select-filter/custom-input-select-filter.component';
import { CustomInputTextFilterComponent } from '../custom-input-text-filter/custom-input-text-filter.component';



const Get_getAllRewardInventory = gql`
query{
  getAllRewardInventory{
    _id
    name
    description 
    type
    price
    total
    shipping
    sold
    is_approve
    image
    active_flag
  }
  
}
`
const Get_searchRewardInventory = gql`
query(
  $NAME: String!,
  $TYPE: String!,
  $PRICE:Float,
  $TOTAL:Float,
  $SHIPPING:Float,
  $SOLD:Float,
  $ACTIVE_FLAG: Boolean,
  $IS_APPROVE:Boolean
)
{
  searchRewardInventory(
    filter:{
      name:$NAME, 
      type:$TYPE, 
      price:$PRICE, 
      total:$TOTAL,
      shipping:$SHIPPING,
      sold:$SOLD,
      active: $ACTIVE_FLAG,
      approve: $IS_APPROVE
      }){
    _id
    name
    description 
    type
    price
    total
    shipping
    sold
    is_approve
    image
    active_flag
  }
}
`


@Component({
  selector: 'app-reward-inventory-search',
  templateUrl: './reward-inventory-search.component.html',
  styleUrls: ['./reward-inventory-search.component.scss']
})
export class RewardInventorySearchComponent implements OnInit {
  reward_inventor: any[] = [];

  isCard: boolean = true;
  isBelowCard: boolean = true;
  constructor(private apollo: Apollo,
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: Get_getAllRewardInventory,

      })
      .valueChanges.subscribe((res: any) => {

        this.reward_inventor = res?.data?.getAllRewardInventory;
        console.log("data Reward Inventory", res);     
      })
  }

  searchForm =  this.fb.group({
    name: [''],
    type: [''],
    price: [null],
    total: [null],
    shipping: [null],
    sold: [null],
    is_approve: [null],
    active_flag: [null],
  })

  settings = {
    actions: {
      custom: [
        {
          name: 'edit',
          title:'<img src="assets/icons/nb-edit.svg" width="30" height="30">',
        },
        {
          name: 'delete',
          title:'<img src="assets/icons/nb-trash.svg" width="30" height="30">'
        },
        ],
        add: false,
        edit: false,
        delete: true
  },
    columns: {
/*       _id: {
        title: 'ID',
        filter: true,
        type: 'string',
      }, */
      name: {
        title: 'NAME',
        filter: {
          type: "custom",
          component: CustomInputTextFilterComponent,
          config: {
            placeholder: "Name"
          }
        }
      },
      type: {
        title: 'TYPE',
        filter: {
          type: 'custom',
          component: CustomInputSelectFilterComponent,
          config: {
            selectText: 'Select Type',
            list: [
              {value: '', title: 'Select Type'},
              {value: '01', title: 'Other'},
              {value: '02', title: 'Point'},
              {value: '03', title: 'Voucher/Coupon'},
              {value: '04', title: 'Course'},
              {value: '05', title: 'Ticket'}
            ]
          }
        },
        valuePrepareFunction: (value: any) => {
          if(value === '01') {
            return 'Other'
          }
          if(value === '02') { 
            return 'Point'
          }
          if(value === '03') {
            return 'Voucher/Coupon'
          }
          if(value === '04') {
            return 'Course'
          }
          if(value === '05') {
            return 'Ticket'
          }
          else {return }
        }
      },
      price: {
        title: 'PRICE',
        filter: {
          type: "custom",
          component: CustomInputTextFilterComponent,
          config: {
            placeholder: "Price"
          }
        }
      },
      total: {
        title: 'TOTAL',
        filter: {
          type: "custom",
          component: CustomInputTextFilterComponent,
          config: {
            placeholder: "Total"
          }
        }
      },
      shipping: {
        title: 'SHIPPING',
        filter: {
          type: "custom",
          component: CustomInputTextFilterComponent,
          config: {
            placeholder: "Shipping"
          }
        }
      },
      sold: {
        title: 'SOLD',
        filter: {
          type: "custom",
          component: CustomInputTextFilterComponent,
          config: {
            placeholder: "Sold"
          }
        }
      },
      is_approve: {
        title: 'APPROVE',
        filter: {
          type: 'custom',
          component: CustomInputSelectFilterComponent,
          config: {
            selectText: 'Select Type',
            list: [
              {value: "", title: 'Select Type'},
              {value: "true", title: 'Approved'},
              {value: "false", title: 'Not Approve'},
            ]
          }
        },
        valuePrepareFunction: (value: any) => {
          if(value === true) {
            return 'Approved'
          }
          if(value === false) {
            return 'Not Approve'
          }
          else {return}
        }
      },
      active_flag: {
        title: 'ACTIVE',
        filter: {
          type: 'custom',
          component: CustomInputSelectFilterComponent,
          config: {
            selectText: 'Select Type',
            list: [
              {value: "", title: 'Select Type'},
              {value: "true", title: 'Actived'},
              {value: "false", title: 'Not Actived'},
            ]
          }
        },
        valuePrepareFunction: (value: any) => {
          if(value === true) {
            return 'Actived'
          }
          if(value === false) {
            return 'Not Active'
          }
          else {return}
        }
      }
    }
  };


  toggleCard(){
    this.isCard = !this.isCard;
  }

  toogleBelowCard() {
    this.isBelowCard = !this.isBelowCard;
  }

  searchRewardInventory() {
    this.apollo
      .watchQuery({
        query: Get_searchRewardInventory,
        variables:
        {
          NAME: this.searchForm.controls["name"].value,
          TYPE: this.searchForm.controls["type"].value,
          PRICE: this.searchForm.controls["price"].value,
          TOTAL: this.searchForm.controls["total"].value,
          SHIPPING: this.searchForm.controls["shipping"].value,
          SOLD: this.searchForm.controls["sold"].value,
          ACTIVE_FLAG: this.searchForm.controls["active_flag"].value,
          IS_APPROVE: this.searchForm.controls["is_approve"].value,
        }
      })
      .valueChanges.subscribe((res: any) => {

        this.reward_inventor = res?.data?.searchRewardInventory;
        console.log("Search By Name: ", this.reward_inventor)
      })
  }

  resetSearchForm() {
    
    this.searchForm.reset();
    this.searchForm.get('name')?.reset('');
    this.searchForm.get('type')?.reset('');
  }


}
