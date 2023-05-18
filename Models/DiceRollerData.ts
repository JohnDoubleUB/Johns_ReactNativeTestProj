class DiceRollerData {
    lastRoll : number = 0;
    rollTotal : number = 0;
    totalDice : number = 0;

    constructor(init?:Partial<DiceRollerData>) {
        Object.assign(this, init);
    }
}

export default DiceRollerData;