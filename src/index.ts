const _combinations = (set: Array<string>, k: number): Array<Array<string>> => {
    if (k > set.length || k <= 0) {
        return [];
    }
    
    if (k == set.length) {
        return [set];
    }
    
    if (k == 1) {
        // @ts-ignore
        return set.reduce((acc, cur) => [...acc, [cur]], []);
    }
    
    let combs: Array<Array<string>> = [];
    let tail_combs: Array<Array<string>> = [];
    
    for (let i: number = 0; i <= set.length - k + 1; i++) {
        tail_combs = _combinations(set.slice(i + 1), k - 1);

        for (let j: number = 0; j < tail_combs.length; j++) {
            combs.push([set[i], ...tail_combs[j]]);
        }
    }
    
    return combs;
}

const _deleteFirstOccurrence = (arr: Array<string>, element: string): Array<string> => {
    arr.splice(arr.indexOf(element), 1);
    return arr;
}

const _deckAvailable = (hand: Array<string>): Array<string> => {
    let deck: Array<string> = ['K', 'K', 'K', 'K', 
    'C', 'C', 'C', 'C', 
    'S', 'S', 'S', 'S',
    '7', '7', '7', '7',
    '6', '6', '6', '6',
    '5', '5', '5', '5',
    '4', '4', '4', '4',
    '3', '3', '3', '3',
    '2', '2', '2', '2',
    'A', 'A', 'A', 'A'];

    for (let i: number = 0; i < hand.length; i++) {
        const card: string = hand[i];
        deck = _deleteFirstOccurrence(deck, card);
    }

    return deck;
}

const _groupHand = (hand: Array<string>): object => hand.reduce((acc: object, cur: string) => {
    // @ts-ignore
    acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
    return acc;
}, {});

const _countHand4Reyes = (hand: Array<string>): number => hand.reduce((acc: number, cur: string) => acc + cardToNumericalValue4Reyes(cur), 0);

const _countHand8Reyes = (hand: Array<string>): number => hand.reduce((acc: number, cur: string) => acc + cardToNumericalValue8Reyes(cur), 0);

export const cardToNumericalValue4Reyes = (card: string): number => {
    if (card === 'K' || card === 'C' || card === 'S') {
        return 10;
    } else if (card === 'A') {
        return 1;
    } else {
        return parseInt(card);
    }
};

export const cardToNumericalValue8Reyes = (card: string): number => {
    if (card === 'K' || card === 'C' || card === 'S' || card === '3') {
        return 10;
    } else if (card === 'A' || card === '2') {
        return 1;
    } else {
        return parseInt(card);
    }
};

const compare = (a: number, b: number, mano: boolean = false): number => {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else {
        return mano ? 1 : -1;
    } 
};

const compareWithoutHand = (a: number, b: number): number => {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else {
        return 0;
    }
};

const convertTo8Reyes = (hand: Array<string>): Array<string> => hand.map((card: string) => {
    if (card === '3') {
        return 'K';
    } else if (card === '2') {
        return 'A';
    } else {
        return card;
    }
});

export const compareGrande4Reyes = (hand1: Array<string>, hand2: Array<string>, mano: boolean = false): number => compareGrande(hand1, hand2, mano);

export const compareGrande8Reyes = (hand1: Array<string>, hand2: Array<string>, mano: boolean = false): number => {
    hand1 = convertTo8Reyes(hand1);
    hand2 = convertTo8Reyes(hand2);
    return compareGrande(hand1, hand2, mano);
};

const compareGrande = (hand1: Array<string>, hand2: Array<string>, mano: boolean = false): number => {
    const order: Array<string> = ['K', 'C', 'S', '7', '6', '5', '4', '3', '2', 'A']
    const ob1: object = _groupHand(hand1);
    const ob2: object = _groupHand(hand2);
    let exit: boolean = false;
    let index: number = 0;
    let result: number = 0;

    do {
        const card: string = order[index];
        // @ts-ignore
        const o1: number | undefined = ob1[card];
        // @ts-ignore
        const o2: number | undefined = ob2[card];

        if (o1 && o2) {
            result = compareWithoutHand(o1, o2);

            if (result !== 0) {
                exit = true;
            }
        } else if (o1 !== undefined) {
            result = 1;
            exit = true;
        } else if (o2 !== undefined) {
            result = -1;
            exit = true;
        }

        index += 1;
    } while (!exit && index < order.length);

    if (result === 0) {
        result = mano ? 1 : -1;
    }

    return result;
};

export const compareChica4Reyes = (hand1: Array<string>, hand2: Array<string>, mano: boolean = false): number => compareChica(hand1, hand2, mano);

export const compareChica8Reyes = (hand1: Array<string>, hand2: Array<string>, mano: boolean = false): number => {
    hand1 = convertTo8Reyes(hand1);
    hand2 = convertTo8Reyes(hand2);
    return compareChica(hand1, hand2, mano);
};

const compareChica = (hand1: Array<string>, hand2: Array<string>, mano: boolean = false): number => {
    const order: Array<string> = ['A', '2', '3', '4', '5', '6', '7', 'S', 'C', 'K'];
    const ob1: object = _groupHand(hand1);
    const ob2: object = _groupHand(hand2);
    let exit: boolean = false;
    let index: number = 0;
    let result: number = 0;

    do {
        const card = order[index];
        // @ts-ignore
        const o1 = ob1[card];
        // @ts-ignore
        const o2 = ob2[card];

        if (o1 && o2) {
            result = compareWithoutHand(o2, o1);
            result *= -1;

            
            if (result !== 0) {
                exit = true;
            }
        } else if (o1 !== undefined) {
            result = 1;
            exit = true;
        } else if (o2 !== undefined) {
            result = -1;
            exit = true;
        }

        index += 1;
    } while (!exit && index < order.length);

    if (result === 0) {
        result = mano ? 1 : -1;
    }

    return result;
};

export const comparePares4Reyes = (hand1: Array<string>, hand2: Array<string>, mano: boolean = false): number => comparePares(hand1, hand2, mano);

export const comparePares8Reyes = (hand1: Array<string>, hand2: Array<string>, mano: boolean = false): number => {
    hand1 = convertTo8Reyes(hand1);
    hand2 = convertTo8Reyes(hand2);
    return comparePares(hand1, hand2, mano);
};

const comparePares = (hand1: Array<string>, hand2: Array<string>, mano: boolean = false): number  => {
    const p1 = thereIsPares4Reyes(hand1);
    const p2 = thereIsPares4Reyes(hand2);
    if (!p1 && !p2 ) {
        return -2;
    } else if (!p1) {
        return -1;
    } else if (!p2) {
        return 1;
    }
    
    const order: Array<string> = ['K', 'C', 'S', '7', '6', '5', '4', '3', '2', 'A'];
    const ob1: object = _groupHand(hand1);
    const ob2: object = _groupHand(hand2);
    let result: number = 0;

    for (let card in ob1) {
        // @ts-ignore
        if (ob1[card] === 1) {
            // @ts-ignore
            delete ob1[card];
        }
    }

    for (let card in ob2) {
        // @ts-ignore
        if (ob2[card] === 1) {
            // @ts-ignore
            delete ob2[card];
        }
    }

    const sum1: number = Object.values(ob1).reduce((acc, cur) => acc + cur, 0);
    const sum2: number = Object.values(ob2).reduce((acc, cur) => acc + cur, 0);

    if (sum1 > sum2) {
        result = 1;
    } else if (sum1 < sum2) {
        result = -1;
    } else {
        let exit: boolean = false;
        let index: number = 0;
    
        do {
            const card = order[index];
            // @ts-ignore
            const o1 = ob1[card];
            // @ts-ignore
            const o2 = ob2[card];
    
            if (o1 && o2) {
                result = compareWithoutHand(o1, o2);
    
                if (result !== 0) {
                    exit = true;
                }
            } else if (o1 !== undefined) {
                result = 1;
                exit = true;
            } else if (o2 !== undefined) {
                result = -1;
                exit = true;
            }
    
            index +=  1;
        } while (!exit && index < order.length);
    }

    if (result === 0) {
        result = mano ? 1 : -1;
    }
    
    return result;
};

export const compareJuego4Reyes = (hand1: Array<string>, hand2: Array<string>, mano: boolean = false): number => compareJuego(hand1, hand2, mano);

export const compareJuego8Reyes = (hand1: Array<string>, hand2: Array<string>, mano: boolean = false): number => {
    hand1 = convertTo8Reyes(hand1);
    hand2 = convertTo8Reyes(hand2);
    return compareJuego(hand1, hand2, mano);
};

const compareJuego = (hand1: Array<string>, hand2: Array<string>, mano: boolean = false): number => {
    const p1 = thereIsJuego4Reyes(hand1);
    const p2 = thereIsJuego4Reyes(hand2);
    
    if (!p1) {
        return -1;
    } else if (!p2) {
        return 1;
    }    
    
    const order: Array<number> = [31, 32, 40, 39, 38, 37, 36, 35, 34, 33];
    let result: number = 0;
    const o1: number = _countHand4Reyes(hand1);
    const o2: number = _countHand4Reyes(hand2);

    if (o1 === o2) {
        result = mano ? 1 : -1;
    } else {
        let index: number = 0;
        let exit: boolean = false;

        do {
            const num: number = order[index];
            if (o1 === num) {
                result = 1;
                exit = true;
            } else if (o2 === num) {
                result = -1;
                exit = true;
            }
            index++;
        } while (!exit && index < order.length);
    }

    return result;
};

export const thereIsPares4Reyes = (hand: Array<string>): boolean => thereIsPares(hand);

export const thereIsPares8Reyes = (hand: Array<string>): boolean => {
    hand = convertTo8Reyes(hand);
    return thereIsPares(hand);
};

const thereIsPares = (hand: Array<string>): boolean => Object.values(_groupHand(hand)).some(a => a > 1);

export const thereIsJuego4Reyes = (hand: Array<string>): boolean => thereIsJuego(hand);

export const thereIsJuego8Reyes = (hand: Array<string>): boolean => {
    hand = convertTo8Reyes(hand);
    return thereIsJuego(hand);
};

const thereIsJuego = (hand: Array<string>): boolean => _countHand4Reyes(hand) >= 31;

export const getProbTable8Reyes = (hand: Array<string>, descartes: Array<string> = [], mano: boolean = false): Array<number | boolean> => {
    const currentDeck: Array<string> = _deckAvailable(hand.concat(descartes));
    const posiblesHands: Array<Array<string>> = _combinations(currentDeck, 4);

    const sumGrande: number = posiblesHands.reduce((acc, cur) => {
        const c = compareGrande8Reyes(hand, cur, mano);
        return c === 1 ? acc + c : acc;
    }, 0);
    const aGrande = sumGrande / posiblesHands.length * 100; 

    const sumChica: number = posiblesHands.reduce((acc, cur) => {
        const c = compareChica8Reyes(hand, cur, mano)
        return c === 1 ? acc + c : acc;
    }, 0);
    const aChica = sumChica / posiblesHands.length * 100; 

    const pairs: boolean = thereIsPares8Reyes(hand);
    let aPares: boolean | number = false;
    if (pairs) {
        // @ts-ignore
        let pairsPosiblesPlays = posiblesHands.filter(a => thereIsPares8Reyes(a));
        const sumPares = pairsPosiblesPlays.reduce((acc, cur) => {
            // @ts-ignore
            const c = comparePares8Reyes(hand, cur, mano);
            return c === 1 ? acc + c : acc;
        }, 0);
        aPares = sumPares / pairsPosiblesPlays.length * 100;
    }

    const juego: boolean = thereIsJuego8Reyes(hand);
    // @ts-ignore
    const juegoPosiblesPlays: Array<Array<string>> = juego ? posiblesHands.filter(a => thereIsJuego8Reyes(a)) : posiblesHands.filter(a => !thereIsJuego8Reyes(a));
    const sumJuego = juegoPosiblesPlays.reduce((acc, cur) => {
        const c = juego ? 
            // @ts-ignore
            compareJuego8Reyes(hand, cur, mano) :
            // @ts-ignore
            compare(_countHand8Reyes(hand), _countHand8Reyes(cur), mano);

        return c === 1 ? acc + c : acc;
    }, 0);

    const aJuego = sumJuego / juegoPosiblesPlays.length * 100;

    return [aGrande, aChica, aPares, aJuego];
};

export const getProbTable4Reyes = (hand: Array<string>, descartes: Array<string> = [], mano: boolean = false): Array<number | boolean> => {
    const currentDeck: Array<string> = _deckAvailable(hand.concat(descartes));
    const posiblesHands: Array<Array<string>> = _combinations(currentDeck, 4);

    const sumGrande: number = posiblesHands.reduce((acc, cur) => {
        const c = compareGrande4Reyes(hand, cur, mano);
        return c === 1 ? acc + c : acc;
    }, 0);
    const aGrande = sumGrande / posiblesHands.length * 100;

    const sumChica: number = posiblesHands.reduce((acc, cur) => {
        const c = compareChica4Reyes(hand, cur, mano)
        return c === 1 ? acc + c : acc;
    }, 0);
    const aChica = sumChica / posiblesHands.length * 100; 

    const pairs: boolean = thereIsPares4Reyes(hand);
    let aPares: boolean | number = false;
    if (pairs) {
        // @ts-ignore
        const pairsPosiblesPlays = posiblesHands.filter(a => thereIsPares4Reyes(a));
        const sumPares = pairsPosiblesPlays.reduce((acc, cur) => {
            // @ts-ignore
            const c = comparePares4Reyes(hand, cur, mano);
            return c === 1 ? acc + c : acc;
        }, 0);
        aPares = sumPares / pairsPosiblesPlays.length * 100;
    }

    const juego: boolean = thereIsJuego4Reyes(hand);
    // @ts-ignore
    const juegoPosiblesPlays: Array<Array<string>> = juego ? posiblesHands.filter(a => thereIsJuego4Reyes(a)) : posiblesHands.filter(a => !thereIsJuego4Reyes(a));
    const sumJuego = juegoPosiblesPlays.reduce((acc, cur) => {
        const c = juego ? 
            // @ts-ignore
            compareJuego4Reyes(hand, cur, mano) :
            // @ts-ignore
            compare(_countHand4Reyes(hand), _countHand4Reyes(cur), mano);

        return c === 1 ? acc + c : acc;
    }, 0);
    const aJuego = sumJuego / juegoPosiblesPlays.length * 100;

    return [aGrande, aChica, aPares, aJuego];
};