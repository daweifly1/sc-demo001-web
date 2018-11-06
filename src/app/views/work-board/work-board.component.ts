import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShowMessageService} from '../../widget/show-message/show-message';

@Component({
  templateUrl: './work-board.component.html',
  styleUrls: ['work-board.component.scss']
})
export class WorkBoardComponent implements OnInit {


  constructor(private activeRoute: ActivatedRoute, private messageService: ShowMessageService
  ) {

  }
  onCloseTab = () => {
    return true;
  }
  ngOnInit() {

  }
}
