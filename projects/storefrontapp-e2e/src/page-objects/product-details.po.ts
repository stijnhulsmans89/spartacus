import {
  browser,
  ElementFinder,
  by,
  element,
  ElementArrayFinder
} from 'protractor';
import { AppPage } from './app.po';
import { E2EUtil } from '../e2e-util';

export class ProductDetailsPage extends AppPage {
  readonly YPAGE = 'cx-product-page';

  readonly page: ElementFinder = element(by.tagName(this.YPAGE));
  readonly productDetails: ElementFinder = this.page.element(
    by.tagName('cx-product-details')
  );
  readonly productTitle: ElementFinder = this.productDetails.element(
    by.css('.cx-product-details__item-name')
  );
  readonly productCode: ElementFinder = this.productDetails.element(
    by.css('.cx-product-details__item-code')
  );
  readonly addToCartComponent: ElementFinder = this.page.element(
    by.tagName('cx-add-to-cart')
  );
  readonly productSummaryComponent: ElementFinder = this.page.element(
    by.tagName('cx-product-summary')
  );
  readonly tabs: ElementArrayFinder = this.page
    .element(by.tagName('ngb-tabset'))
    .all(by.css('li'));
  readonly productPrice: ElementFinder = this.productSummaryComponent.element(
    by.css('.cx-product-summary__price')
  );
  readonly outOfStockDiv: ElementFinder = this.productSummaryComponent.element(
    by.cssContainingText('span', 'Out of stock')
  );
  readonly addToCartButton: ElementFinder = this.addToCartComponent.element(
    by.tagName('button')
  );
  readonly productQuantitySpan: ElementFinder = this.addToCartComponent.element(
    by.css('span[class="entry-quantity ng-star-inserted"]')
  );
  readonly itemCounterComponent: ElementFinder = this.productDetails.element(
    by.tagName('cx-item-counter')
  );
  readonly tabContent: ElementFinder = this.productDetails.element(
    by.css('.y-product-details__tab-section')
  );
  readonly writeReviewBtn: ElementFinder = this.productDetails.element(
    by.css('.y-product-reviews__tab-review--head button')
  );
  readonly reviews: ElementArrayFinder = this.productDetails.all(
    by.css('.y-product-reviews__tab-review--container')
  );
  readonly writeReviewForm: ElementFinder = this.productDetails.element(
    by.tagName('y-product-reviews')
  );
  readonly rating: ElementFinder = this.writeReviewForm.element(
    by.tagName('ngb-rating')
  );
  readonly ratingStar: ElementArrayFinder = this.rating.all(by.css('.star'));
  readonly reviewSubmitBtn: ElementFinder = this.writeReviewForm.element(
    by.css('.btn-primary')
  );
  readonly reviewInputField: ElementArrayFinder = this.writeReviewForm.all(
    by.tagName('input')
  );
  readonly reviewTextareaField: ElementArrayFinder = this.writeReviewForm.all(
    by.tagName('textarea')
  );
  readonly reviewCancelBtn: ElementFinder = this.writeReviewForm.element(
    by.css('.btn-secondary')
  );
  readonly itemCounterUpButton: ElementFinder = this.itemCounterComponent
    .all(by.tagName('button'))
    .get(1);

  async navigateTo(productId: string) {
    await browser.get('/product/' + productId);
    await this.waitForReady();
  }

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.page);
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async getProductQuantity(): Promise<string> {
    return this.productQuantitySpan.getText();
  }
}
