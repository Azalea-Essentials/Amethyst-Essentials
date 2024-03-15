// This is a utility for the ingame editors. Will do things like move items in arrays and more
class ArrayEditor {
    // stackoverflow my beloved <3
    moveItem(array: any[], from: number, to: number) {
        let data = JSON.parse(JSON.stringify(array));
        var f = data.splice(from, 1)[0];
        data.splice(to, 0, f);
        return data;
    }
    moveUp(array: any[], index: number) {
        if(index >= array.length || index + 1 >= array.length) return array;
        return this.moveItem(array, index, index + 1);
    }
    moveDown(array: any[], index: number) {
        if(index < 0 || index - 1 < 0) return array;
        return this.moveItem(array, index, index - 1);
    }
}

export const arrayEditor = new ArrayEditor();