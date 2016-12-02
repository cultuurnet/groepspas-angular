import {TestBed} from '@angular/core/testing';

import {GroupPassInfoComponent} from './group-pass-info.component';

describe('HomeComponent', () => {
    beforeEach(() => TestBed.configureTestingModule({ declarations: [GroupPassInfoComponent] }));

    it('should instantiate the HomeComponent', () => {
        let fixture = TestBed.createComponent(GroupPassInfoComponent);
        expect(fixture.componentInstance instanceof GroupPassInfoComponent).toBe(true, 'should create HomeComponent');
    });
});
