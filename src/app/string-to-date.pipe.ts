import {Pipe, PipeTransform} from '@angular/core';

/**
 * Pipe to transform a string to a date
 */
@Pipe({name: 'stringToDate'})

export class StringToDatePipe implements PipeTransform {

    /**
     * Transform a date that is passed as string into a date
     * @param value The date passed as string
     * @returns {Date} The Date object
     */
    transform(value: string): Date {
        if (value) {
            return new Date(value);
        }
    }
}