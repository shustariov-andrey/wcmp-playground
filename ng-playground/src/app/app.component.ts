import { Component } from '@angular/core';
import '../../../vanilla/src/lib/typeahead/typeahead.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-playground';

  getItems() {
    return Promise.all([{
      key: 'CSS',
      label: 'CSS'
    }, {
      key: 'SASS',
      label: 'Sass'
    }, {
      key: 'SCSS',
      label: 'Scss'
    }])
  }
}
