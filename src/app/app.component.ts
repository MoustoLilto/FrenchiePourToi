import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import {CloudinaryImage} from '@cloudinary/url-gen';
import { CloudinaryService } from '@/services/cloudinary.service';
import { CloudinaryImageComponent } from '@/cloudinary-image/cloudinary-image.component';
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, CloudinaryImageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'FrenchiePourToi';
  img!: CloudinaryImage;

  constructor(private cloudinaryService: CloudinaryService) {}

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
}
