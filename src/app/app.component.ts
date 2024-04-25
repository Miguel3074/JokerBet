import { Component } from '@angular/core';
import { BodyModule } from "./components/body/body.module";
import { FooterModule } from "./components/footer/footer.module";
import { HeaderComponent } from './components/header/header.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [HeaderComponent, BodyModule, FooterModule]
})
export class AppComponent {
  title = 'JokerBet';
}
