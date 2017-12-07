import {Component } from 'react';
import * as React from 'react';

import { Tile } from '../models'
import { tileImageFromIdentifier } from '../services/tile-image-lookup'

export class TileComponent extends Component<TileProps, any> {
  constructor(props: TileProps) {
    super(props);
  }

  public render() {
    return (
      <div className="tile d-inline-block">
        <img src={tileImageFromIdentifier(this.props.tile.tileIdentifier)} />
      </div>
    );
  }
}

interface TileProps {
  tile: Tile;
}
