import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamSectionComponent } from './team-section.component';

describe('TeamSectionComponent', () => {
    let component: TeamSectionComponent;
    let fixture: ComponentFixture<TeamSectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TeamSectionComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TeamSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have team members', () => {
        expect(component.teamMembers().length).toBeGreaterThan(0);
    });

    it('should add a team member', () => {
        const initialCount = component.teamMembers().length;
        const newMember = {
            id: 'test-member',
            name: 'Test Member',
            role: 'Test Role',
            description: 'Test Description',
            imagePublicId: 'test-image',
            colorClass: 'primary' as const,
        };

        component.addTeamMember(newMember);
        expect(component.teamMembers().length).toBe(initialCount + 1);
    });

    it('should update a team member', () => {
        const memberToUpdate = component.teamMembers()[0];
        const updatedName = 'Updated Name';

        component.updateTeamMember(memberToUpdate.id, { name: updatedName });

        const updatedMember = component.teamMembers().find((m) => m.id === memberToUpdate.id);
        expect(updatedMember?.name).toBe(updatedName);
    });

    it('should remove a team member', () => {
        const initialCount = component.teamMembers().length;
        const memberToRemove = component.teamMembers()[0];

        component.removeTeamMember(memberToRemove.id);
        expect(component.teamMembers().length).toBe(initialCount - 1);
        expect(component.teamMembers().find((m) => m.id === memberToRemove.id)).toBeUndefined();
    });
});
