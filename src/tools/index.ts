import CircleAction from "./draw/circle";
import CleanAction from "./clean";
import LineAction from "./draw/line";
import PencilAction from "./draw/pencil";
import RectAction from "./draw/rect";
import UndoAction from "./undo";
import EllipseAction from "./draw/ellipse";

export default [
  // SelectItemAction,
  PencilAction,
  LineAction,
  RectAction,
  CircleAction,
  EllipseAction,
  CleanAction,
  UndoAction,
]