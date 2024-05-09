import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
 
  // navbar option 1
  // @Output() toggleSidenavEvent = new EventEmitter<void>();

  // toggleSidenav() {
  //   this.toggleSidenavEvent.emit();
  // }

  // navbar option 2
  showSettingsPanel: boolean = false;
  user:any;
  toggleSettingsPanel() {
    this.showSettingsPanel = !this.showSettingsPanel;
  }

  clear(){
    localStorage.clear();
    }
}
