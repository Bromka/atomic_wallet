import {Title} from "@/models/Title";
export enum Sort {
    DESC,
    ASC
}

export class Qbe {
    private currentFieldSort: Title | null = null;
    sort: Sort | null = null;
    filter = '';

    get field(): Title | null {
        return this.currentFieldSort;
    }

    set currentField(field: Title) {

        if (field.short == this.currentFieldSort?.short) {
            this.sort == Sort.DESC ? this.sort = Sort.ASC : this.clearSort();
        } else {
            this.currentFieldSort = field
            this.sort = Sort.DESC;
        }
    }
    private clearSort(){
        this.sort = null;
        this.currentFieldSort = null;
    }
}