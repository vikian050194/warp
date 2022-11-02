class Color{
    constructor(name, value){
        this.name = name;
        this.value = value;
    }
}

export const colors = [
    new Color("blue", "#00A0DC"),
    new Color("violet", "#8C68CB"),
    new Color("red", "#EC4339"),
    new Color("orange", "#F47B16"),
    new Color("cyan", "#00AEB3"),
    new Color("yellow", "#EFB920"),
    new Color("pink", "#ED4795"),
    new Color("green", "#7CB82F"),
    new Color("gray", "#86898C")
];

export const defaultColor = colors[2];