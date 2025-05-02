import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FrenchiePourToi';

  items= [
    { title: $localize`:@@angularDoc:Explore the Docs`, link: 'https://angular.dev' },
    { title: $localize`:@@angularTutorial:Learn with Tutorials`, link: 'https://angular.dev/tutorials' },
    { title: $localize`:@@angularCli:CLI Docs`, link: 'https://angular.dev/tools/cli' },
    { title: $localize`:@@angularLanguageService:Angular Language Service`, link: 'https://angular.dev/tools/language-service' },
    { title: $localize`:@@angularDevTools:Angular DevTools`, link: 'https://angular.dev/tools/devtools' },
  ];
}
