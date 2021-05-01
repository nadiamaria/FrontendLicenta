import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeItem } from './dataModel/typeItem';
import { TypeResource } from './resources/TypeResource';

@Injectable()
export class TypeService {
  constructor(private typeResource: TypeResource) {}

  public findType(): Observable<TypeItem[]> {
    return this.typeResource.findAllTypes();
  }
}
