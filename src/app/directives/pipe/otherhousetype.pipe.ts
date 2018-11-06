import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateReform',
  pure: true // 如果你的管道不受外界影响，只受参数的影响请遵守FP原则，设置为纯管道
})
export class StateReformPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    switch (value) {
      case '0': return '未入库';
      case '1': return '部分入库';
      case '2': return '已入库';
      case '3': return '强制入库';
    }
  }

}
