import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-select-cofluencer',
  templateUrl: './select-cofluencer.component.html',
  styleUrls: ['./select-cofluencer.component.css']
})
export class SelectCofluencerComponent implements OnInit {

  @Input() influencer: any;
  clicked = true;

  constructor(
    private companyService: CompanyService,
    private toaster: ToasterService,
  ) { }

  ngOnInit() {
  }

  addCofluencer(cofluencer) {
    this.clicked = !this.clicked;
    this.companyService.addCofluencer(cofluencer);
  }

  removeCofluencer(cofluencer) {
    this.clicked = !this.clicked;
    this.companyService.removeCofluencer(cofluencer);
  }

}
