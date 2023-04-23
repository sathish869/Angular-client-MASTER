import {
  CollectionViewer,
  DataSource,
  SelectionChange,
} from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, merge, Observable, of, take } from 'rxjs';
import { UserNode } from '../models/node-details.models';
import { TokenShareService } from './token-share.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { handleAnError } from '../utils/http-error-handler.utils';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NestedTreeDataSource implements DataSource<UserNode> {
  dataChange = new BehaviorSubject<UserNode[]>([]);

  constructor(
    private _treeControl: NestedTreeControl<UserNode>,
    private tokenShareService: TokenShareService,
    private matSnackBar: MatSnackBar
  ) {}

  get data(): UserNode[] {
    return this.dataChange.value;
  }
  set data(value: UserNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }
  public reloadTree(a: UserNode[]) {
    this.data = null as any;
    this.data = a;
  }
  connect(collectionViewer: CollectionViewer): Observable<UserNode[]> {
    this._treeControl.expansionModel.changed.subscribe((change) => {
      if ((change as SelectionChange<UserNode>).added.length) {
        change.added.forEach((node) => {
          if (node.children?.length > 0) {
            this.collapse(node);
          } else {
            this.expand(node);
          }
        });
      }

      if ((change as SelectionChange<UserNode>).removed.length) {
        change.removed.forEach((node) => this.collapse(node));
      }
    });
    return merge(collectionViewer.viewChange, this.dataChange).pipe(
      map(() => this.data)
    );
  }
  expand(node: UserNode) {
    node.isLoading = true;
    this.tokenShareService
      .onGetRepoDetail(node.name)
      .pipe(
        take(1),
        finalize(() => {
          node.isLoading = false;
        }),
        catchError((error: HttpErrorResponse) => {
          this.matSnackBar.open(handleAnError(error));
          return of([]);
        })
      )
      .subscribe((childNodeData: UserNode[]) => {
        if (childNodeData.length > 0) {
          childNodeData = childNodeData
            .sort((a, b) => a.stargazers_count - b.stargazers_count)
            .reverse()
            .slice(0, 10);
          this.append(node, childNodeData);
        }
      });
  }

  append(node: UserNode, childNodeData: UserNode[]): void {
    node.children.push(...childNodeData);
    node.expanded = true;
    console.log(this.data);
    this.reloadTree(this.data);
  }

  collapse(node: UserNode): void {
    node.isLoading = true;
    node.children = [];
    node.expanded = false;
    console.log(this.data);
    this.reloadTree(this.data);
    node.isLoading = false;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    console.log('disconnected');
  }
}
