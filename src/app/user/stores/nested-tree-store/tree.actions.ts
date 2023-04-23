import { createAction, props } from "@ngrx/store"
import {  UserNode } from "../../models/node-details.models";

const storeTreeData=createAction("[TREE] store tree data", props<{userNodeData : UserNode[]}>());
const removeTreeData=createAction("[TREE] remove loaded tree data");

export const treeActions = {
  storeTreeData,
  removeTreeData
};