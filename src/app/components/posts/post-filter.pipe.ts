import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'postFilter'
})
export class PostFilterPipe implements PipeTransform {

    transform(value: any[], searchTerm: string) {

        if (!value || !searchTerm) {
            return value;
        }

        const filterA = value.filter(
            val => val.title.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

        const filterB = value.filter(
            val => val._creator.username.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

        const filterConcat = filterA.concat(filterB);

        return filterConcat;
    }
}
