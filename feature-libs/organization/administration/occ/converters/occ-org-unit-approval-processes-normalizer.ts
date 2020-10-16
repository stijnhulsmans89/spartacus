import { Injectable } from '@angular/core';
import { Converter, Occ } from '@spartacus/core';
import { B2BApprovalProcess } from '@spartacus/organization/administration/core';

@Injectable()
export class OccOrgUnitApprovalProcessNormalizer
  implements Converter<Occ.B2BApprovalProcessList, B2BApprovalProcess[]> {
  constructor() {}

  convert(
    source: Occ.B2BApprovalProcessList,
    target?: B2BApprovalProcess[]
  ): B2BApprovalProcess[] {
    if (target === undefined) {
      target = [...(source.approvalProcesses as any)];
    }
    return target;
  }
}
