import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


interface TypeItem {
  type: number;
  value: string;
}

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() searchType: number;
  @Output() searchByType: EventEmitter<number> = new EventEmitter();

  @Input() searchTitle: string;
  @Output() searchByTitle: EventEmitter<string> = new EventEmitter();

  genre: TypeItem[] = [
    { type: 1, value: '材设新闻' },
    { type: 2, value: '采购文化' },
    { type: 3, value: '政策法规' },
    { type: 4, value: '图文欣赏' },
    { type: 5, value: '公告' },
    { type: 6, value: '废旧物资信息公示' },
    { type: 8, value: '江铜采购指数' },
    { type: 9, value: '公司动态' },
    { type: 10, value: '招标公告' },
    { type: 11, value: '中标公示' }
  ];

  constructor() { }

  public typeChange(event) {
    this.searchType = event.path[0].value;
    this.searchByType.emit(event.path[0].value);
  }

  public titleChange(event) {
    this.searchTitle = event.target.value;
    this.searchByTitle.emit(event.target.value);
  }


  ngOnInit() {

  }



}
