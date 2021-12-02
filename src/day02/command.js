export class Command {
    constructor(v){
        [this.command, this.value] = v.split(' ');
        this.value = parseInt(this.value);
    }

    updatePosition(positionalInfo, mode){
        if(mode === 1){
            this._updatePositionInMode1(positionalInfo);
        } else if (mode === 2) {
            this._updatePositionInMode2(positionalInfo);
        }
    }

    _updatePositionInMode1(positionalInfo){
        if(this.command === 'forward') {
            positionalInfo.horizontal += this.value;
        } else if (this.command === 'down') {
            positionalInfo.depth += this.value;
        } else if (this.command === 'up') {
            positionalInfo.depth -= this.value;
        }
    }

    _updatePositionInMode2(positionalInfo){
        if(this.command === 'forward') {
            positionalInfo.horizontal += this.value;
            positionalInfo.depth += positionalInfo.aim * this.value;
        } else if (this.command === 'down') {
            positionalInfo.aim += this.value;
        } else if (this.command === 'up') {
            positionalInfo.aim -= this.value;
        }
    }
}