import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
    imports: [
        CommonModule,
        BsDropdownModule.forRoot(),
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
        PaginationModule.forRoot()
    ],
    exports: [BsDropdownModule, TooltipModule, ModalModule, PaginationModule]
})
export class AppBootstrapModule { }
