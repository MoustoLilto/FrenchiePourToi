import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { DarkModeService } from '@/services/dark-mode.service';


import {CloudinaryImage} from '@cloudinary/url-gen';
import { CloudinaryService } from '@/services/cloudinary.service';
import { CloudinaryImageComponent } from '@/cloudinary-image/cloudinary-image.component';
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, CloudinaryImageComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'FrenchiePourToi';
  isDark: Signal<boolean>;
  img!: CloudinaryImage;

  constructor(private cloudinaryService: CloudinaryService, private darkModeService: DarkModeService) {
    this.isDark = this.darkModeService.isDark;
  }

  items= [
    { title: $localize`:@@angularDoc:Explore the Docs`, link: 'https://angular.dev' },
    { title: $localize`:@@angularTutorial:Learn with Tutorials`, link: 'https://angular.dev/tutorials' },
    { title: $localize`:@@angularCli:CLI Docs`, link: 'https://angular.dev/tools/cli' },
    { title: $localize`:@@angularLanguageService:Angular Language Service`, link: 'https://angular.dev/tools/language-service' },
    { title: $localize`:@@angularDevTools:Angular DevTools`, link: 'https://angular.dev/tools/devtools' },
  ];

  ngOnInit() {
    this.img = this.cloudinaryService.getChiotProfileImage('frenchie-hero_lyekts');
    console.log(this.img);
  }

  toggleDarkMode() {
    this.darkModeService.toggleDark();
  }
}
