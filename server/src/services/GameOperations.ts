import { Tile, Hand } from '../models'

// Hand operations
function removeTile(hand: Hand, tileId: number): Hand {
  if (!hand.freeTiles.find(tile => tile.id == tileId)) {
    throw Error(`Tried to remove tile ${tileId} which is not present`)
  }
  return new Hand(hand.melds, hand.freeTiles.filter(tile => tile.id != tileId))
}

function addTile(hand: Hand, tile: Tile): Hand {
  let freeTiles = hand.freeTiles.slice();
  freeTiles.push(tile);
  return new Hand(hand.melds, freeTiles);
}
