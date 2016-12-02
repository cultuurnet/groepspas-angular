import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GroupPassInfoComponent} from './group-pass-info/components/group-pass-info.component';

const appRoutes: Routes = [
    { path: '', component: GroupPassInfoComponent },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
