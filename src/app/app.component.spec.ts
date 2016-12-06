import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { StringToDatePipe } from './string-to-date.pipe'

describe('AppComponentTest', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [AppComponent]
    }));

    it('should instantiate the AppComponent', () => {
        let fixture = TestBed.createComponent(AppComponent);
        expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
    });
});

describe('StringToDatePipeTest', () => {
    let pipe = new StringToDatePipe();
    it('transforms strings to dates', () => {
        expect(pipe.transform('2016-10-02T00:00:00+02:00')).toEqual(new Date('2016-10-02T00:00:00+02:00'));
    });
});
