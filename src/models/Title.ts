 enum TitleType {
    Image,
    Text

}

 class Title {
    type: TitleType = TitleType.Text;
    short: string
    text: string;

    constructor(short: string, text: string, type: TitleType) {
        this.short = short;
        this.text = text;
        this.type = type ?? TitleType.Text;
    }
}

export {Title, TitleType};