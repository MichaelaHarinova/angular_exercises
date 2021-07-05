import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'pm-bicolor-button',
  templateUrl: './bicolor-button.component.html',
  styleUrls: ['./bicolor-button.component.css'],
})
export class BicolorButtonComponent implements OnChanges {
  @Input() textColor: string = '#000000';
  buttonColor: string = '';
  buttonPrimary: string = '#309880';
  buttonSecondary: string = '#055c48';
  @Input() buttonText: string = 'Try me out!';
  @Input() buttonActive!: boolean;

  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnChanges(): void {
    if (this.buttonActive) {
      this.buttonColor = this.buttonPrimary;
    } else {
      this.buttonColor = this.buttonSecondary;
    }
  }

  onClick(): void {
    this.buttonClicked.emit();
  }
}
