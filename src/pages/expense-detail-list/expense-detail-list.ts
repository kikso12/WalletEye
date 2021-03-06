import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController} from 'ionic-angular';
import { ExpenseDetailPage } from '../expense-detail/expense-detail';
import { ExpenseDetailFormPage } from '../expense-detail-form/expense-detail-form';
import { ExpenseCategoryPage } from '../expense-category/expense-category';
import { ExpenseSubcategoryPage } from '../expense-subcategory/expense-subcategory';

import { ExpenseDetailService } from '../../app/services/expense-detail-service';
import { ExpenseSubcategory as Subcategory } from '../../app/models/expense-subcategory';
import { ExpenseDetail as Detail } from '../../app/models/expense-detail';

/**
 * Generated class for the ExpenseDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expense-detail-list',
  templateUrl: 'expense-detail-list.html',
})
export class ExpenseDetailListPage {
  subCategory: Subcategory;
  details: Detail[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              private expenseDetailService: ExpenseDetailService) {
    this.subCategory = this.navParams.get('subcategory');

    this.expenseDetailService.listBySubcategory(this.subCategory.id).subscribe(data => {
      this.details = data;
    });
  }

  ionViewDidLoad() {}

  add() {
    this.navCtrl.push(ExpenseDetailFormPage, {'subcategory': this.subCategory});
  }

  goToDetail(detail: Detail) {
    this.navCtrl.push(ExpenseDetailPage, {'detailId': detail.id});
  }

  openPopover(myEvent) {
    const popover = this.popoverCtrl.create(ExpenseCategoryPage);
    popover.present({
      ev: myEvent
    });
  }

  goBackToSubCategories() {
    this.navCtrl.push(ExpenseSubcategoryPage, this.subCategory.gasto_categorias_id);
  }

}
