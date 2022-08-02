class Color{
    constructor(name, value){
        this.name = name;
        this.value = value;
    }
}

export const colors = [
    new Color("red", "#DD514C"),
    new Color("orange", "#F37B1D"),
    new Color("yellow", "#FAD232"),
    new Color("green", "#5EB95E"),
    new Color("blue", "#1F8DD6"),
    new Color("violet", "#8058A5")
];

export const defaultColor = colors[3];