import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-meter',
    templateUrl: './meter.component.html',
    styleUrls: ['./meter.component.scss'],
})
export class MeterComponent {

    @ViewChild('meterPointer', {static: false}) pointerRef: ElementRef;

    @Input() set pointer(deg: number) {
        if(this.pointerRef){
            this.pointerRef.nativeElement.style.transform = 'rotate(' + deg + 'deg)'
        }
    }

    scales: number[] = [...Array(11).keys()];
}
