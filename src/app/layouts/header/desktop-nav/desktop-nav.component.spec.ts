import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DesktopNavComponent } from './desktop-nav.component';
import { Route } from '@/core/constants/routes.constants';

describe('DesktopNavComponent', () => {
    let component: DesktopNavComponent;
    let fixture: ComponentFixture<DesktopNavComponent>;
    let de: DebugElement;

    const mockNavItems: Route[] = [
        { path: '/home', label: 'Accueil', title: 'Accueil' },
        { path: '/products', label: 'Produits', title: 'Produits' },
        { path: '/about', label: 'À Propos', title: 'À Propos' },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DesktopNavComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(DesktopNavComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render a NAV element', () => {
        fixture.detectChanges();
        const navElement = de.query(By.css('nav'));
        expect(navElement).toBeTruthy();
    });

    it('should render a UL element inside NAV', () => {
        fixture.detectChanges();
        const ulElement = de.query(By.css('nav ul'));
        expect(ulElement).toBeTruthy();
    });

    describe('when navItems are provided', () => {
        beforeEach(() => {
            component.navItems = [...mockNavItems]; // Use a copy to avoid modification issues
            fixture.detectChanges();
        });

        it('should render the correct number of navigation items', () => {
            const listItems = de.queryAll(By.css('ul li'));
            expect(listItems.length).toBe(mockNavItems.length);
        });

        it('should render correct labels for navigation items', () => {
            const linkDes = de.queryAll(By.css('ul li a'));
            linkDes.forEach((linkDe, index) => {
                expect(linkDe.nativeElement.textContent.trim()).toBe(mockNavItems[index].label);
            });
        });

        it('should render correct routerLinks for navigation items', () => {
            const linkDes = de.queryAll(By.css('ul li a'));
            linkDes.forEach((linkDe, index) => {
                // For RouterLink, Angular adds an href attribute based on the routerLink value
                // We need to check the routerLink directive instance or the generated href
                expect(linkDe.attributes['href']).toBe(mockNavItems[index].path);
            });
        });

        it('should apply "text-primary" class to navigation links', () => {
            const linkDes = de.queryAll(By.css('ul li a'));
            linkDes.forEach((linkDe) => {
                expect(linkDe.nativeElement.classList.contains('text-primary')).toBeTrue();
            });
        });
    });

    describe('when navItems is empty', () => {
        beforeEach(() => {
            component.navItems = [];
            fixture.detectChanges();
        });

        it('should render an empty UL element', () => {
            const listItems = de.queryAll(By.css('ul li'));
            expect(listItems.length).toBe(0);
        });

        it('should still render the NAV and UL elements', () => {
            const navElement = de.query(By.css('nav'));
            const ulElement = de.query(By.css('nav ul'));
            expect(navElement).toBeTruthy();
            expect(ulElement).toBeTruthy();
        });
    });

    describe('when navItems input changes', () => {
        it('should update the rendered list', () => {
            // Initial empty state
            component.navItems = [];
            fixture.detectChanges();
            let listItems = de.queryAll(By.css('ul li'));
            expect(listItems.length).toBe(0);

            // Update navItems
            component.navItems = [...mockNavItems];
            fixture.detectChanges();
            listItems = de.queryAll(By.css('ul li'));
            expect(listItems.length).toBe(mockNavItems.length);
            expect(de.query(By.css('ul li a')).nativeElement.textContent.trim()).toBe(
                mockNavItems[0].label
            );
        });
    });
});
