enum Player {
    Tatsi = "Tatsi",
    Benni = "Benni",
    Johannes = "Johannes",
    Franzi = "Franzi",
    Jonas = "Jonas", 
    Ole = "Ole",
}

const playedCouples: [Player, Player][] = [
    [Player.Tatsi, Player.Benni],
    [Player.Johannes, Player.Franzi],
    [Player.Tatsi, Player.Johannes],
    [Player.Benni, Player.Franzi],
    [Player.Ole, Player.Jonas],
]

const players = Object.values(Player)
const possibleCouples: [Player, Player][] = players.flatMap((player1, index) => 
    players.slice(index + 1).map((player2): [Player, Player] => [player1, player2]))


const notPlayedCouples: [Player, Player][] = possibleCouples.filter(possibleCouple => 
    !playedCouples.some(playedCouple => 
        possibleCouple.every(player => playedCouple.includes(player))
    )
)

console.log(`Players: ${players.join(", ")} \n`)
console.log(`${playedCouples.length} already played couples:`)
playedCouples.forEach(couple => console.log(couple.join(" & ")))
console.log()

function notUndefined<T>(value: T | undefined): value is T {
    return value !== undefined
}

const recursive = (notPlayedCouples: [Player, Player][], couples?: [Player, Player][]): [Player, Player][][] | undefined => 
    notPlayedCouples.flatMap((nextCouple, i) => {
        const restCouples = notPlayedCouples.slice(i + 1).filter(couple => !couple.includes(nextCouple[0]) && !couple.includes(nextCouple[1]))
        const updatedCouples = [...(couples ?? []), nextCouple]
        const restPlayers = players.filter(player => !(updatedCouples ?? []).flat().includes(player))
        //console.log({ notPlayedCouples, couples, updatedCouples, i, restPlayers, restCouples })
        if (restPlayers.length === 0) {
            return [updatedCouples]
        }
        if (restCouples.length === 0) {
            return undefined
        }
        return recursive(restCouples, updatedCouples)
    }).filter(notUndefined)

const output = recursive(notPlayedCouples)

console.log(`Found ${output?.length} solutions`)
output?.forEach((solution, index) => console.log(`${index + 1}) ${solution.map(couple => couple.join(" & ")).join(", ")}`))