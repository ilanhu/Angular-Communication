import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {
  listFilter: string;
  @Input()  displayDetails: boolean;
  @Input()  hitCount: number;
  @ViewChild('filterElement') filterElementRef: ElementRef;
  hitMessage: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes['hitCount'] && !changes['hitCount'].currentValue ){
      this.hitMessage = 'No matches found';
    }
    else    {
      this.hitMessage = 'Hits: ' + this.hitCount;
    }

  }

  ngAfterViewInit(): void {
     if(this.filterElementRef.nativeElement){
       this.filterElementRef.nativeElement.focus();
     }
  }


}
