import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Budget, CostCenterService, EntitiesModel } from '@spartacus/core';
import {
  IconTestingModule,
  Table,
  TableTestingModule,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CostCenterBudgetListService } from './cost-center-budget-list.service';

const mockCostCenterEntities: EntitiesModel<Budget> = {
  values: [
    {
      code: 'first',
      selected: true,
    },
    {
      code: 'second',
      selected: false,
    },
    {
      code: 'third',
      selected: true,
    },
  ],
};

class MockCostCenterService {
  getBudgets(): Observable<EntitiesModel<Budget>> {
    return of(mockCostCenterEntities);
  }
}

describe('CostCenterBudgetListService', () => {
  let service: CostCenterBudgetListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IconTestingModule, RouterTestingModule, TableTestingModule],
      providers: [
        CostCenterBudgetListService,
        {
          provide: CostCenterService,
          useClass: MockCostCenterService,
        },
      ],
    });
    service = TestBed.inject(CostCenterBudgetListService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should filter selected budgets', () => {
    let result: Table<Budget>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(2);
    expect(result.data[0].code).toEqual('first');
    expect(result.data[1].code).toEqual('third');
  });
});