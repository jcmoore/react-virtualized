/** @flow */
import { CellMeasurerCache } from "../CellMeasurer";

type CellMeasurerCacheDecoratorParams = {
  cellMeasurerCache: CellMeasurerCache,
  columnIndexOffset: number | (() => number),
  rowIndexOffset: number | (() => number)
};

type IndexParam = {
  index: number
};

/**
 * Caches measurements for a given cell.
 */
export default class CellMeasurerCacheDecorator {
  _cellMeasurerCache: CellMeasurerCache;
  _columnIndexOffset: number;
  _columnIndexOffsetGetter: ?() => number;
  _rowIndexOffset: number;
  _rowIndexOffsetGetter: ?() => number;

  constructor(params: CellMeasurerCacheDecoratorParams = {}) {
    const {
      cellMeasurerCache,
      columnIndexOffset = 0,
      rowIndexOffset = 0
    } = params;

    this._cellMeasurerCache = cellMeasurerCache;
    this._columnIndexOffset = typeof columnIndexOffset === "number" ? columnIndexOffset : 0;
    this._columnIndexOffsetGetter = typeof columnIndexOffset === "function" ? columnIndexOffset : null;
    this._rowIndexOffset = typeof rowIndexOffset === "number" ? rowIndexOffset : 0;
    this._rowIndexOffsetGetter = typeof rowIndexOffset === "function" ? rowIndexOffset : null;
  }

  _getColumnOffset() {
    return this._columnIndexOffsetGetter ? this._columnIndexOffsetGetter() : this._columnIndexOffset;
  }

  _getRowOffset() {
    return this._rowIndexOffsetGetter ? this._rowIndexOffsetGetter() : this._rowIndexOffset;
  }

  clear(rowIndex: number, columnIndex: number): void {
    this._cellMeasurerCache.clear(
      rowIndex + this._getRowOffset(),
      columnIndex + this._getColumnOffset()
    );
  }

  clearAll(): void {
    this._cellMeasurerCache.clearAll();
  }

  columnWidth = ({ index }: IndexParam) => {
    this._cellMeasurerCache.columnWidth({
      index: index + this._getColumnOffset()
    });
  };

  get defaultHeight(): number {
    return this._cellMeasurerCache.defaultHeight;
  }

  get defaultWidth(): number {
    return this._cellMeasurerCache.defaultWidth;
  }

  hasFixedHeight(): boolean {
    return this._cellMeasurerCache.hasFixedHeight();
  }

  hasFixedWidth(): boolean {
    return this._cellMeasurerCache.hasFixedWidth();
  }

  getHeight(rowIndex: number, columnIndex: ?number = 0): ?number {
    return this._cellMeasurerCache.getHeight(
      rowIndex + this._getRowOffset(),
      columnIndex + this._getColumnOffset()
    );
  }

  getWidth(rowIndex: number, columnIndex: ?number = 0): ?number {
    return this._cellMeasurerCache.getWidth(
      rowIndex + this._getRowOffset(),
      columnIndex + this._getColumnOffset()
    );
  }

  has(rowIndex: number, columnIndex: ?number = 0): boolean {
    return this._cellMeasurerCache.has(
      rowIndex + this._getRowOffset(),
      columnIndex + this._getColumnOffset()
    );
  }

  rowHeight = ({ index }: IndexParam) => {
    this._cellMeasurerCache.rowHeight({
      index: index + this._getRowOffset()
    });
  };

  set(
    rowIndex: number,
    columnIndex: number,
    width: number,
    height: number
  ): void {
    this._cellMeasurerCache.set(
      rowIndex + this._getRowOffset(),
      columnIndex + this._getColumnOffset(),
      (width: number),
      (height: number)
    );
  }
}
