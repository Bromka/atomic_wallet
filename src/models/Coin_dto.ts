import {BASE_URL} from "@/config/app_config";

export default class Coin {
    fullName: string;
    imageUrl: string;
    ticker: string;
    id: string;
    USD: any;
    RUB: any;
    EUR: any;

    constructor({FullName, Name, Id, ImageUrl}: any) {
        this.fullName = FullName;
        this.imageUrl = ImageUrl;
        this.ticker = Name;
        this.id = Id;
    }

    get fullImageLink(): string {
        return 'http://' + `${BASE_URL}${this.imageUrl}`
    }

    setPrice({USD, RUB, EUR}: any) {
        this.USD = USD;
        this.RUB = RUB;
        this.EUR = EUR;
    }
}
