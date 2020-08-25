import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { SplitViewDeactivateGuard, TableConfig } from '@spartacus/storefront';
import { ROUTE_PARAMS } from '../constants';
import { OrganizationTableType } from '../shared/organization.model';
import { UnitAddressCreateComponent } from './addresses/create/unit-address-create.component';
import { UnitAddressDetailsComponent } from './addresses/details/unit-address-details.component';
import { UnitAddressEditComponent } from './addresses/edit/unit-address-edit.component';
import { UnitAddressListComponent } from './addresses/list/unit-address-list.component';
import { UnitAssignApproversComponent } from './approvers/assign/unit-assign-approvers.component';
import { UnitApproverListComponent } from './approvers/list/unit-approver-list.component';
import { UnitChildrenComponent } from './children/unit-children.component';
import { UnitCostCentersComponent } from './cost-centers/unit-cost-centers.component';
import { UnitCreateComponent } from './create/unit-create.component';
import { UnitDetailsComponent } from './details/unit-details.component';
import { UnitEditComponent } from './edit/unit-edit.component';
import { UnitListComponent } from './list/unit-list.component';
import { UnitUserAssignRolesComponent } from './users/assign-roles/unit-user-assign-roles.component';
import { UnitUserListComponent } from './users/list/unit-user-list.component';

// TODO:#my-account-architecture - Number.MAX_VALUE?
const MAX_OCC_INTEGER_VALUE = 2147483647;

const listPath = `organization/units/:${ROUTE_PARAMS.unitCode}`;
const paramsMapping: ParamsMapping = {
  unitCode: 'uid',
};

export const unitsRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orgUnits: {
        paths: ['organization/units'],
      },
      orgUnitCreate: {
        paths: ['organization/units/create'],
      },
      orgUnitDetails: {
        paths: [listPath],
        paramsMapping,
      },
      orgUnitEdit: {
        paths: [`${listPath}/edit`],
        paramsMapping,
      },
      orgUnitChildren: {
        paths: [`${listPath}/children`],
        paramsMapping,
      },
      orgUnitUsers: {
        paths: [`${listPath}/users`],
        paramsMapping,
      },
      orgUnitAssignRoles: {
        paths: [`${listPath}/users/roles/assign`],
        paramsMapping,
      },
      orgUnitApprovers: {
        paths: [`${listPath}/approvers`],
        paramsMapping,
      },
      orgUnitAssignApprovers: {
        paths: [`${listPath}/approvers/assign`],
        paramsMapping,
      },
      orgUnitManageAddresses: {
        paths: [`${listPath}/addresses`],
        paramsMapping,
      },
      orgUnitAddressDetails: {
        paths: [`${listPath}/addresses/:id`],
        paramsMapping,
      },
      orgUnitAddressCreate: {
        paths: [`${listPath}/addresses/create`],
        paramsMapping,
      },
      orgUnitAddressEdit: {
        paths: [`${listPath}/addresses/:id/edit`],
        paramsMapping,
      },
      orgUnitCostCenters: {
        paths: [`${listPath}/cost-centers`],
        paramsMapping,
      },
    },
  },
};

export const unitsCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageUnitsListComponent: {
      component: UnitListComponent,
      childRoutes: [
        {
          path: 'create',
          component: UnitCreateComponent,
          canDeactivate: [SplitViewDeactivateGuard],
        },
        {
          path: `:${ROUTE_PARAMS.unitCode}`,
          component: UnitDetailsComponent,
          canDeactivate: [SplitViewDeactivateGuard],
          children: [
            {
              path: 'children',
              component: UnitChildrenComponent,
              canDeactivate: [SplitViewDeactivateGuard],
            },
            {
              path: 'users',
              component: UnitUserListComponent,
              canDeactivate: [SplitViewDeactivateGuard],
              children: [
                {
                  path: 'roles/assign',
                  component: UnitUserAssignRolesComponent,
                  canDeactivate: [SplitViewDeactivateGuard],
                },
              ],
            },
            {
              path: 'approvers',
              component: UnitApproverListComponent,
              canDeactivate: [SplitViewDeactivateGuard],
              children: [
                {
                  path: 'assign',
                  component: UnitAssignApproversComponent,
                  canDeactivate: [SplitViewDeactivateGuard],
                },
              ],
            },
            {
              path: 'addresses',
              component: UnitAddressListComponent,
              canDeactivate: [SplitViewDeactivateGuard],
              children: [
                {
                  path: 'create',
                  component: UnitAddressCreateComponent,
                  canDeactivate: [SplitViewDeactivateGuard],
                },
                {
                  path: ':id',
                  component: UnitAddressDetailsComponent,
                  canDeactivate: [SplitViewDeactivateGuard],
                  children: [
                    {
                      path: 'edit',
                      component: UnitAddressEditComponent,
                      canDeactivate: [SplitViewDeactivateGuard],
                    },
                  ],
                },
              ],
            },
            {
              path: 'cost-centers',
              component: UnitCostCentersComponent,
              canDeactivate: [SplitViewDeactivateGuard],
            },
          ],
        },
        {
          path: `:${ROUTE_PARAMS.unitCode}/edit`,
          component: UnitEditComponent,
        },
      ],

      guards: [AuthGuard],
    },
  },
};

export function unitsTableConfigFactory(): TableConfig {
  return unitsTableConfig;
}

export const unitsTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.UNIT_USERS]: {
      fields: ['summary', 'link'],
      options: {
        hideHeader: true,
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
    [OrganizationTableType.UNIT_CHILDREN]: {
      fields: ['summary', 'link'],
      options: {
        hideHeader: true,
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
    [OrganizationTableType.UNIT_APPROVERS]: {
      fields: ['summary', 'link', 'unassign'],
      options: {
        hideHeader: true,
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
    [OrganizationTableType.UNIT_ASSIGN_APPROVERS]: {
      fields: ['selected', 'summary', 'link'],
      options: {
        hideHeader: true,
        pagination: {
          sort: 'byName',
        },
      },
      lg: {
        fields: ['name', 'email', 'roles', 'orgUnit'],
        options: {
          hideHeader: false,
        },
      },
    },
    [OrganizationTableType.UNIT_ASSIGN_ROLES]: {
      fields: ['summary', 'link'],
      options: {
        hideHeader: true,
        pagination: {
          sort: 'byName',
        },
      },
      lg: {
        fields: [
          'name',
          'email',
          'roleCustomer',
          'roleApprover',
          'roleManager',
          'roleAdministrator',
        ],
        options: {
          hideHeader: false,
        },
      },
    },
    [OrganizationTableType.UNIT_MANAGE_ADDRESSES]: {
      fields: ['summary'],
      options: {
        hideHeader: true,
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
    [OrganizationTableType.UNIT_COST_CENTERS]: {
      fields: ['summary', 'link'],
      options: {
        hideHeader: true,
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
  },
};