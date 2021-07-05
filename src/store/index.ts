import {createLogger, createStore} from 'vuex'
import * as config from '../config/app_config';
import Coin from "@/models/Coin_dto";
import {Title, TitleType} from "@/models/Title";
import {Qbe} from "@/models/Qbe";


export default createStore({


    actions: {
        async fetchCoinsGeneralData(ctx) {
            const coinsList = config.PREFERRED_COINS.split(',').map(e => e.trim());
            const response = await fetch(`https://${config.API_URL}/data/coin/generalinfo`,
                {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({
                        'api_key': config.API_KEY,
                        'fsyms': coinsList,
                        'tsym': ['USD', 'RUB', 'EUR'],
                    })
                });
            const data = await response.json();
            ctx.commit('setCoinsListGeneralData', data.Data)
            ctx.dispatch('fetchCoinsPrice');
        },
        async fetchCoinsPrice(ctx) {
            const coinsList = config.PREFERRED_COINS.split(',').map(e => e.trim());
            const response = await fetch(`https://${config.API_URL}/data/pricemulti`,
                {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({
                        'api_key': config.API_KEY,
                        'fsyms': coinsList,
                        'tsyms': ['USD', 'RUB', 'EUR'],
                    })
                });
            const data = await response.json();
            ctx.commit('setCoinsPrice', data)
        }
    },
    mutations: {
        setCoinsListGeneralData(state, data: Array<any>) {
            state.coinsGeneralDataList = data.map(item => new Coin(item.CoinInfo));
        },
        setCoinsPrice(state, data) {
            state.coinsGeneralDataList.forEach((elem) => {
                elem.setPrice(data[elem.ticker])
            });
        }
    },
    state: {
        coinsGeneralDataList: [] as Coin[],
        Titles: [
            new Title('logo', '', TitleType.Image),
            new Title('ticker', 'Тикер', TitleType.Image),
            new Title('fullName', 'Название', TitleType.Image),
            new Title('USD', '$', TitleType.Image),
            new Title('EUR', '€', TitleType.Image),
            new Title('RUB', '₽', TitleType.Image),
        ],
        Qbe: new Qbe(),
    },
    getters: {
        getFilteredCoinsList: (state, getters) => {
            return state.coinsGeneralDataList.filter((element: Coin) => {
                return element.ticker.toLowerCase().includes(getters.getQbe.filter.toLowerCase()) ||
                    element.fullName.toLowerCase().includes(getters.getQbe.filter.toLowerCase())
            });
        },
        getCoinsList: (state, getters) => {
            if (!(state.Qbe.field instanceof Title)) {
                return getters.getFilteredCoinsList;
            }
            if (state.Qbe.sort == 0) {
                return getters.getFilteredCoinsList.sort((a: any, b: any) => {
                    if (b[state.Qbe.field!.short] < a[state.Qbe.field!.short]) {
                        return -1
                    }
                    return 1

                })
            } else {
                return getters.getFilteredCoinsList.sort((a: any, b: any) => {
                    if (b[state.Qbe.field!.short] < a[state.Qbe.field!.short]) {
                        return 1
                    }
                    return -1
                })
            }


        },
        getTitles: state => state.Titles,
        getQbe: state => state.Qbe,
    },
})
